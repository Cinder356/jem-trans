// src/lib.rs
mod commands; // Подключаем наш новый модуль

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
    
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        // Регистрируем команды, обращаясь через путь модулей
        .invoke_handler(tauri::generate_handler![
            commands::theme::get_system_theme_colors,
            commands::lang::detect_language
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
