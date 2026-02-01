// src/commands/theme.rs
use gtk::prelude::*;
use serde::Serialize;
use std::sync::mpsc;

#[derive(Serialize)]
pub struct GtkThemeColors {
    bg_color: String,
    fg_color: String,
    base_color: String,
    text_color: String,
    accent_color: String,
    accent_fg_color: String,
    success_color: String,
    warning_color: String,
    error_color: String,
    insensitive_bg_color: String,
    insensitive_fg_color: String,
    border_color: String,
}

// Вспомогательная функция (не является командой Tauri, поэтому без макроса)
fn rgba_to_hex(color: gdk::RGBA) -> String {
    format!(
        "#{:02X}{:02X}{:02X}",
        (color.red() * 255.0) as u8,
        (color.green() * 255.0) as u8,
        (color.blue() * 255.0) as u8
    )
}

#[tauri::command]
pub async fn get_system_theme_colors() -> Result<GtkThemeColors, String> {
    let (tx, rx) = mpsc::channel();

    glib::MainContext::default().invoke(move || {
        // Убедимся, что GTK инициализирован (в контексте Tauri на Linux это обычно уже сделано,
        // но создание виджетов безопасно только в основном потоке или через invoke)
        let window = gtk::Window::new(gtk::WindowType::Toplevel);
        let context = window.style_context();
        
        let lookup = |name: &str| -> String {
            rgba_to_hex(
                context
                    .lookup_color(name)
                    .unwrap_or_else(|| gdk::RGBA::new(1.0, 0.0, 1.0, 1.0)) 
            )
        };
        
        let colors = GtkThemeColors {
            bg_color: lookup("theme_bg_color"),
            fg_color: lookup("theme_fg_color"),
            base_color: lookup("theme_base_color"), 
            text_color: lookup("theme_text_color"),
            accent_color: lookup("theme_selected_bg_color"),
            accent_fg_color: lookup("theme_selected_fg_color"),
            success_color: lookup("success_color"),
            warning_color: lookup("warning_color"),
            error_color: lookup("error_color"),
            insensitive_bg_color: lookup("insensitive_bg_color"),
            insensitive_fg_color: lookup("insensitive_fg_color"),
            border_color: lookup("borders"), 
        };

        unsafe { window.destroy() };
        let _ = tx.send(colors);
    });

    rx.recv().map_err(|e| e.to_string())
}
