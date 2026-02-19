use crate::logic::play_audio;
use crate::state::AppState;
use msedge_tts::tts::client::connect_async;
use msedge_tts::tts::SpeechConfig;
use specta;
use std::sync::Arc;
use tauri::State;

#[tauri::command]
#[specta::specta]
pub async fn get_voices(state: State<'_, Arc<AppState>>) -> Result<Vec<String>, String> {
    let voices = state.voices.read().await;
    Ok(voices.iter().filter_map(|v| v.short_name.clone()).collect())
}

#[tauri::command]
#[specta::specta]
pub async fn speak(
    text: String,
    voice: String,
    state: State<'_, Arc<AppState>>,
) -> Result<(), String> {
    let voices = state.voices.read().await;
    let voice_info = voices
        .iter()
        .find(|v| v.short_name.as_ref() == Some(&voice))
        .ok_or_else(|| format!("Voice '{}' not found", voice))?;

    let config = SpeechConfig::from(voice_info);
    let mut tts = connect_async()
        .await
        .map_err(|e| format!("Failed to connect to TTS: {}", e))?;
    let audio = tts
        .synthesize(&text, &config)
        .await
        .map_err(|e| format!("Failed to synthesize speech: {}", e))?;

    drop(voices);

    // Получаем микшер из AppState
    let audio_mixer = state.audio_mixer.lock().await;
    let mixer = audio_mixer.as_ref().ok_or("Audio not initialized")?.clone();
    drop(audio_mixer);

    play_audio(audio.audio_bytes, mixer)?;

    Ok(())
}
