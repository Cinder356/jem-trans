import type { LangCode } from "../types/Langs";

interface GetTranslationPromptParams {
  text: string;
  sourceLang: LangCode | 'auto';
  targetLang: LangCode;
}

export const getTranslationPrompt = ({ text, sourceLang, targetLang }: GetTranslationPromptParams) => {
  return `You are an expert linguist and professional translator. Your task is to translate the provided text from ${sourceLang} to ${targetLang}.

Strictly adhere to the following rules:
1. Translate the text accurately, preserving the original meaning, tone, nuances, and formatting.
2. Output strictly and ONLY in valid JSON format.
3. Do not include any markdown formatting (e.g., \`\`\`json), conversational filler, explanations, or greetings.
4. Ensure any quotation marks or special characters inside the translated text are properly escaped to maintain valid JSON.

Expected JSON Output Format:
  { "translation": "<translated text goes here>" }

Input Data:
Source Language: ${sourceLang}
Target Language: ${targetLang}
Text to translate: ${text}`
}
