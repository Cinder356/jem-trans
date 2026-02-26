use crate::logic::parse_chat_messages;
use crate::models::ChatMessage;
use crate::state::AppState;
use async_openai::{config::OpenAIConfig, types::chat::CreateChatCompletionRequestArgs, Client};
use reqwest::{ClientBuilder, Proxy};
use serde_json::Value;
use specta;
use std::sync::Arc;
use tauri::State;

#[tauri::command]
#[specta::specta]
pub async fn set_llm_config(
    api_key: String,
    api_url: String,
    proxy_url: Option<String>,
    state: State<'_, Arc<AppState>>,
) -> Result<(), String> {
    let mut client_builder = ClientBuilder::new();

    if let Some(proxy) = proxy_url {
        let proxy = Proxy::all(&proxy).map_err(|e| format!("Invalid proxy URL: {}", e))?;
        client_builder = client_builder.proxy(proxy);
    }

    let http_client = client_builder.build().map_err(|e| e.to_string())?;
    let config = OpenAIConfig::new()
        .with_api_key(api_key)
        .with_api_base(api_url);
    let client = Client::with_config(config).with_http_client(http_client);

    let mut client_guard = state.openai_client.lock().await;
    *client_guard = Some(client);

    Ok(())
}

#[tauri::command]
#[specta::specta]
pub async fn ask_llm(
    messages: Vec<ChatMessage>,
    model: String,
    temperature: f32,
    state: tauri::State<'_, Arc<AppState>>,
) -> Result<String, String> {
    let client_guard = state.openai_client.lock().await;
    let client = client_guard.as_ref().ok_or("API Key not set")?;
    let api_messages = match parse_chat_messages(messages) {
        Ok(msgs) => msgs,
        Err(e) => return Err(format!("Parsing chat messages error: {}", e)),
    };
    let request = CreateChatCompletionRequestArgs::default()
        .model(model)
        .max_tokens(2048u16)
        .temperature(temperature)
        .messages(api_messages)
        .stream(false)
        .build()
        .map_err(|e| e.to_string())?;

    // ВАЖНО: тип ответа — serde_json::Value, чтобы избежать ошибок десериализации
    let resp_json: Value = client
        .chat()
        .create_byot(request) // <- вместо .create(...)
        .await
        .map_err(|e| format!("API error: {}", e))?;

    // Извлекаем текст (проверьте по реальному JSON — путь может отличаться)
    let content = resp_json
        .get("choices")
        .and_then(|c| c.get(0))
        .and_then(|ch| ch.get("message").and_then(|m| m.get("content")))
        .and_then(|v| v.as_str())
        .unwrap_or_default()
        .to_string();

    Ok(content)
}
