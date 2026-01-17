import { invoke } from "@tauri-apps/api/core";
import { type LangDetectionResult } from '@/app/types/LangDetectionResult';
import type { LangCode } from "@/app/types/Langs";
import { getTranslationPrompt } from "@/app/consts/prompts";
import useLlmService from "@/app/hooks/useLlmService";
// import useSettings from "@/app/hooks/useSettings";

interface TranslateParams {
  term: string;
  sourceLang: LangCode | 'auto';
  targetLang: LangCode;
}

interface TranslationResponse {
  translation: string;
}

export default () => {
  const llm = useLlmService();

  const translateViaLlm = async ({ term, sourceLang, targetLang }: TranslateParams) => {
    const prompt = getTranslationPrompt({ term, sourceLang, targetLang });
    return JSON.parse(await llm.generate(prompt)) as Promise<TranslationResponse>;
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
