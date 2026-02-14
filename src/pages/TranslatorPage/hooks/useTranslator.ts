import { invoke } from "@tauri-apps/api/core";
import { type LangDetectionResult } from '@/app/types/LangDetectionResult';
import type { LangCode } from "@/app/types/Langs";
import { getTranslationPrompt } from "@/app/consts/prompts";
import useSettings from "@/app/hooks/useSettings";

export interface TranslateParams {
  term: string;
  sourceLang: LangCode | 'auto';
  targetLang: LangCode;
}

export interface TranslateResponse {
  translation: string;
}

export default () => {
  const { settings } = useSettings();

  const translateViaLlm = async ({ term, sourceLang, targetLang }: TranslateParams) => {
    const prompt = getTranslationPrompt({ term, sourceLang, targetLang });
    try {
      let res = await invoke("ask_llm", {
        model: settings.model,
        temperature: .7,
        messages: [{
          role: 'user',
          content: prompt
        }]
      }) as string;

      res = res
        .replace(/^(```|""")\w*\n/, "")
        .replace(/(```|""")$/, "");

      return JSON.parse(res) as Promise<TranslateResponse>;
    } catch (err) {
      throw new Error(err as string);
    }
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
