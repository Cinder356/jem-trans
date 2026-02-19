mod commands;
mod logic;
mod models;
mod proxy_setup;
mod state;

use specta_typescript::Typescript;
use state::AppState;
use std::sync::Arc;
use tauri::Manager;
use tauri_specta::{collect_commands, Builder};
use tokio::sync::Mutex;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
    proxy_setup::init_env_from_settings();

    // Load voices on startup
    let rt = tokio::runtime::Runtime::new().unwrap();
    let voices = rt
        .block_on(msedge_tts::voice::get_voices_list_async())
        .expect("Failed to load voices");

    let builder = Builder::<tauri::Wry>::new()
        .commands(collect_commands![
            commands::llm::set_llm_config,
            commands::llm::ask_llm,
            commands::tts::speak,
            commands::tts::get_voices,
        ])
        .typ::<models::ChatMessage>();
    #[cfg(debug_assertions)] // <- Only export on non-release builds
    builder
        .export(Typescript::default(), "../src/bindings.ts")
        .expect("Failed to export typescript bindings");

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .manage(Arc::new(AppState {
            openai_client: Mutex::new(None),
            audio_mixer: Mutex::new(None),
            _audio_stream: Mutex::new(None),
            voices: tokio::sync::RwLock::new(voices),
        }))
        .setup(|app| {
            let state = app.try_state::<Arc<AppState>>().unwrap();

            if let Ok(stream) = rodio::OutputStreamBuilder::open_default_stream() {
                let mixer = stream.mixer().clone();

                let rt = tokio::runtime::Runtime::new().unwrap();
                rt.block_on(async {
                    let mut audio_stream = state._audio_stream.lock().await;
                    let mut audio_mixer = state.audio_mixer.lock().await;

                    *audio_stream = Some(Box::new(stream));
                    *audio_mixer = Some(Arc::new(mixer));
                });
            }

            Ok(())
        })
        .invoke_handler(builder.invoke_handler())
        .invoke_handler(tauri::generate_handler![
            commands::theme::get_system_theme_colors,
            commands::lang::detect_language,
            commands::llm::set_llm_config,
            commands::llm::ask_llm,
            commands::tts::speak,
            commands::tts::get_voices,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
