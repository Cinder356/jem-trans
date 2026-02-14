use serde::Deserialize;
use specta::Type;

#[derive(Deserialize, Type)]
pub struct ChatMessage {
    pub role: String,
    pub content: String,
}
