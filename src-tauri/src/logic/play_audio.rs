use rodio::mixer::Mixer;
use rodio::{Decoder, Sink};
use std::io::Cursor;
use std::sync::Arc;

pub fn play_audio(wav_buffer: Vec<u8>, mixer: Arc<Mixer>) -> Result<(), String> {
    let sink = Sink::connect_new(&mixer);

    let cursor = Cursor::new(wav_buffer);
    let source = Decoder::new(cursor).map_err(|e| format!("Failed to decode audio: {}", e))?;

    sink.append(source);

    sink.sleep_until_end();

    Ok(())
}
