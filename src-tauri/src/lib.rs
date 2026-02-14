mod commands;
mod logic;
mod models;
mod proxy_setup;
mod state;

use specta_typescript::Typescript;
use state::AppState;
use std::sync::Arc;
use tauri_specta::{collect_commands, Builder};
use tokio::sync::Mutex;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
    proxy_setup::init_env_from_settings();

    let builder = Builder::<tauri::Wry>::new()
        .commands(collect_commands![
            commands::llm::set_llm_config,
            commands::llm::ask_llm,
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
        }))
        .invoke_handler(builder.invoke_handler())
        .invoke_handler(tauri::generate_handler![
            commands::theme::get_system_theme_colors,
            commands::lang::detect_language,
            commands::llm::set_llm_config,
            commands::llm::ask_llm,
        ])
        // .setup(move |app| {
        //     // This is also required if you want to use events
        //     builder.mount_events(app);
        //     Ok(())
        // })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
