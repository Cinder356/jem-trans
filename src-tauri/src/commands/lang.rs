// src/commands/lang.rs
use serde::Serialize;
use whatlang::{Detector, Lang};

#[derive(Serialize)]
pub struct DetectionResult {
    lang_code: String,
    lang_name: String,
    script: String,
    confidence: f64,
}

#[tauri::command]
pub fn detect_language(text: String, whitelist: Option<Vec<String>>) -> Option<DetectionResult> {
    let detector = if let Some(codes) = whitelist {
        let allowlist: Vec<Lang> = codes
            .iter()
            .filter_map(|code| Lang::from_code(code))
            .collect();
        
        if allowlist.is_empty() {
            Detector::new() 
        } else {
            Detector::with_allowlist(allowlist)
        }
    } else {
        Detector::new()
    };

    let info = detector.detect(&text)?;

    Some(DetectionResult {
        lang_code: info.lang().code().to_string(),
        lang_name: info.lang().eng_name().to_string(),
        script: format!("{:?}", info.script()),
        confidence: info.confidence(),
    })
}
