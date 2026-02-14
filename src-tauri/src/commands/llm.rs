use crate::logic::parse_chat_messages;
use crate::models::ChatMessage;
use crate::state::AppState;
use async_openai::{config::OpenAIConfig, types::chat::CreateChatCompletionRequestArgs, Client};
use specta;
use std::sync::Arc;
use tauri::State;

#[tauri::command]
#[specta::specta]
pub async fn set_llm_config(
    api_key: String,
    api_url: String,
    state: State<'_, Arc<AppState>>,
) -> Result<(), String> {
    let config = OpenAIConfig::new()
        .with_api_key(api_key)
        .with_api_base(api_url);
    let client = Client::with_config(config);

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
    let response = client
        .chat()
        .create(request)
        .await
        .map_err(|e| format!("API error: {}", e))?;
    Ok(response.choices[0]
        .message
        .content
        .clone()
        .unwrap_or_default())
}
