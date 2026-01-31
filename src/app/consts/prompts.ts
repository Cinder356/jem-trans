import type { LangCode } from "../types/Langs";

interface GetTranslationPromptParams {
  term: string;
  sourceLang: LangCode | 'auto';
  targetLang: LangCode;
}

export const getTranslationPrompt = ({ term, sourceLang, targetLang }: GetTranslationPromptParams) => {
  return (
    `Translate the text ${term} from ${sourceLang} to ${targetLang}. If ${sourceLang} == "auto", detect the source language automatically. Output exactly one valid JSON object with a single key "translation", e.g. {"translation":"..."} — no extra text, keys, comments, or markup. Preserve punctuation and basic formatting; keep the translation natural and concise.`
  )
}
