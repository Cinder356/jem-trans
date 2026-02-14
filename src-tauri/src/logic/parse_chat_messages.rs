use crate::models::ChatMessage;
use async_openai::types::chat::{
    ChatCompletionRequestAssistantMessageArgs, ChatCompletionRequestMessage,
    ChatCompletionRequestSystemMessageArgs, ChatCompletionRequestUserMessageArgs,
};
pub fn parse_chat_messages(
    messages: Vec<ChatMessage>,
) -> Result<Vec<ChatCompletionRequestMessage>, String> {
    messages
        .into_iter()
        .map(|msg| match msg.role.as_str() {
            "user" => ChatCompletionRequestUserMessageArgs::default()
                .content(msg.content)
                .build()
                .map_err(|e| e.to_string())
                .map(|m| m.into()),

            "assistant" => ChatCompletionRequestAssistantMessageArgs::default()
                .content(msg.content)
                .build()
                .map_err(|e| e.to_string())
                .map(|m| m.into()),

            "system" => ChatCompletionRequestSystemMessageArgs::default()
                .content(msg.content)
                .build()
                .map_err(|e| e.to_string())
                .map(|m| m.into()),

            _ => Err(format!("Unknown role: {}", msg.role)),
        })
        .collect()
}
