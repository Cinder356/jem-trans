use async_openai::{config::OpenAIConfig, Client};
use tokio::sync::Mutex;

pub struct AppState {
    pub openai_client: Mutex<Option<Client<OpenAIConfig>>>,
}
