mod commands;
mod proxy_setup;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
    proxy_setup::init_env_from_settings();
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            commands::theme::get_system_theme_colors,
            commands::lang::detect_language
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
