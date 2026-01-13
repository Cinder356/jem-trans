import type { LangCode } from "./languages";

interface GetTranslationPromptParams {
  term: string;
  sourceLang: LangCode | 'auto';
  targetLang: LangCode;
}

export const getTranslationPrompt = ({ term, sourceLang, targetLang }: GetTranslationPromptParams) => {
  return (`
You are a professional translator.
Inputs:
- Source: ${sourceLang} (if "auto", detect language from text)
- Target: ${targetLang}
- Content: "${term}"

Instructions:
1. Translate "Content" to the Target language accurately.
2. If Source is "auto", detect it based on the "Content". If the text is ambiguous (e.g., same spelling in multiple languages), infer the most probable language or default to English context if applicable.
3. Output strictly valid JSON with the key "translation".
4. NO explanations, NO markdown.

Output format:
{"translation": "..."}
  `)
  //   return `You are a professional linguist and translator. Your task is to provide a highly accurate translation of the text, word, or expression provided below.
  //
  // Inputs:
  // - Source Language: ${sourceLang}
  // - Target Language: ${targetLang}
  // - Text to translate: "${term}"
  //
  // Instructions:
  // 1. Translate the text accurately, preserving the nuance, tone, and context.
  // 2. If the text is a single word or idiom, provide the most relevant translation for general usage unless context implies otherwise.
  // 3. Output strictly valid JSON format.
  // 4. Use the key "translation" for the result.
  // 5. Do NOT use Markdown code blocks (like \`\`\`json).
  //   6. Do NOT add any conversational fillers or explanations.Output ONLY the JSON string.
  //
  // Output format:
  //   { "translation": "YOUR_TRANSLATION_HERE" } `
}
