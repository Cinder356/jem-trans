// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use gtk::prelude::*;
use serde::Serialize;
use std::sync::mpsc;
use whatlang::{Detector, Lang};

// Структура для возврата данных на фронтенд
#[derive(serde::Serialize)]
pub struct DetectionResult {
    lang_code: String,  // Например: "en", "ru"
    lang_name: String,  // Например: "English", "Russian"
    script: String,     // Например: "Latin", "Cyrillic"
    confidence: f64,    // Уверенность (0.0 - 1.0)
}

#[derive(Serialize)]
struct GtkThemeColors {
    // Основные цвета окна
    bg_color: String,
    fg_color: String,
    
    // Цвета для полей ввода (Input / Textarea)
    base_color: String,
    text_color: String,
    
    // Акцент (выделение)
    accent_color: String,
    accent_fg_color: String,
    
    // Семантические цвета (Успех, Ошибка, Предупреждение)
    success_color: String,
    warning_color: String,
    error_color: String,
    
    // Неактивные элементы (Disabled)
    insensitive_bg_color: String,
    insensitive_fg_color: String,
    
    // Границы и декорации
    border_color: String, // Часто используется для рамок
}

#[tauri::command]
fn detect_language(text: String, whitelist: Option<Vec<String>>) -> Option<DetectionResult> {
    // Если передан whitelist, преобразуем строковые коды (напр. "ru") в enum Lang
    let detector = if let Some(codes) = whitelist {
        let allowlist: Vec<Lang> = codes
            .iter()
            .filter_map(|code| Lang::from_code(code)) // Игнорируем некорректные коды
            .collect();
        
        // Если список оказался пустым после фильтрации, используем детектор по умолчанию,
        // или можно вернуть None, если строгий режим. Здесь используем список.
        if allowlist.is_empty() {
            Detector::new() 
        } else {
            Detector::with_allowlist(allowlist)
        }
    } else {
        Detector::new()
    };

    // Пытаемся определить язык
    let info = detector.detect(&text)?;

    // Формируем результат
    Some(DetectionResult {
        lang_code: info.lang().code().to_string(),
        lang_name: info.lang().eng_name().to_string(),
        script: format!("{:?}", info.script()), // Преобразуем enum Script в строку
        confidence: info.confidence(),
    })
}

// Вспомогательная функция для конвертации gdk::RGBA в Hex строку (#RRGGBB)
fn rgba_to_hex(color: gdk::RGBA) -> String {
    format!(
        "#{:02X}{:02X}{:02X}",
        (color.red() * 255.0) as u8,
        (color.green() * 255.0) as u8,
        (color.blue() * 255.0) as u8
    )
}

#[tauri::command]
async fn get_system_theme_colors() -> Result<GtkThemeColors, String> {
    let (tx, rx) = mpsc::channel();

    glib::MainContext::default().invoke(move || {
        let window = gtk::Window::new(gtk::WindowType::Toplevel);
        let context = window.style_context();
        
        // Хелпер для сокращения кода. Если цвет не найден, возвращает пурпурный (чтобы сразу заметить ошибку)
        let lookup = |name: &str| -> String {
            rgba_to_hex(
                context
                    .lookup_color(name)
                    .unwrap_or_else(|| gdk::RGBA::new(1.0, 0.0, 1.0, 1.0)) 
            )
        };
        
        // ВАЖНО: Некоторые цвета (например, borders) могут требовать контекста виджета, 
        // но эти имена являются стандартными экпортами в Adwaita и большинстве тем.
        
        let colors = GtkThemeColors {
            bg_color: lookup("theme_bg_color"),
            fg_color: lookup("theme_fg_color"),
            
            // base_color - это фон для списков, инпутов, деревьев файлов (обычно белый)
            base_color: lookup("theme_base_color"), 
            text_color: lookup("theme_text_color"),
            
            accent_color: lookup("theme_selected_bg_color"),
            accent_fg_color: lookup("theme_selected_fg_color"),
            
            success_color: lookup("success_color"),
            warning_color: lookup("warning_color"),
            error_color: lookup("error_color"),
            
            insensitive_bg_color: lookup("insensitive_bg_color"),
            insensitive_fg_color: lookup("insensitive_fg_color"),
            
            // 'borders' - это специальный именованный цвет в GTK CSS
            border_color: lookup("borders"), 
        };

        unsafe { window.destroy() };
        let _ = tx.send(colors);
    });

    rx.recv().map_err(|e| e.to_string())
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .invoke_handler(tauri::generate_handler![get_system_theme_colors, detect_language])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
