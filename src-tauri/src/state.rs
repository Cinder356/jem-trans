use async_openai::{config::OpenAIConfig, Client};
use msedge_tts::voice::Voice;
use rodio::mixer::Mixer;
use std::sync::Arc;
use tokio::sync::{Mutex, RwLock};

pub struct AppState {
    pub openai_client: Mutex<Option<Client<OpenAIConfig>>>,
    pub audio_mixer: Mutex<Option<Arc<Mixer>>>,
    pub _audio_stream: Mutex<Option<Box<rodio::OutputStream>>>,
    pub voices: RwLock<Vec<Voice>>,
}
