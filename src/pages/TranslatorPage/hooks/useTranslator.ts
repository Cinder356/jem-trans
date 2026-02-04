import { invoke } from "@tauri-apps/api/core";
import { type LangDetectionResult } from '@/app/types/LangDetectionResult';
import type { LangCode } from "@/app/types/Langs";
import { getTranslationPrompt } from "@/app/consts/prompts";
import useLlmService from "@/app/hooks/useLlmService";

export interface TranslateParams {
  term: string;
  sourceLang: LangCode | 'auto';
  targetLang: LangCode;
}

export interface TranslateResponse {
  translation: string;
}

export default () => {
  const llm = useLlmService();

  const translateViaLlm = async ({ term, sourceLang, targetLang }: TranslateParams) => {
    const prompt = getTranslationPrompt({ term, sourceLang, targetLang });
    let res = await llm.generate(prompt);
    res = res
      .replace(/^(```|""")\w*\n/, "")
      .replace(/(```|""")$/, "");
    return JSON.parse(res) as Promise<TranslateResponse>;
  }

  const detectLang = async (text: string, whitelist?: LangCode[]) => {
    const res = await invoke("detect_language", { text, whitelist }) as LangDetectionResult;
    return res;
  }

  return {
    translateViaLlm,
    detectLang
  }
}
