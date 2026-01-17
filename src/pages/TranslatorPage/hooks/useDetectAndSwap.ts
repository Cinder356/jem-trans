import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { LangCode, LangPair } from "@/app/types/Langs";
import useTranslation from "./useTranslation";
import useTranslator from "./useTranslator";

type DetectAndSwapLangsFn = (text: string, currentPair: LangPair) => void;

export const DETECT_AND_SWAP_QUERY_KEY = ['detect-key'] as const;

export default () => {
  const { swapLangs } = useTranslation();
  const { detectLang } = useTranslator();
  const queryClient = useQueryClient();

  const detectAndSwapLangs: DetectAndSwapLangsFn = useCallback(async (text: string, currentPair: LangPair) => {
    if (!text || currentPair.source === 'auto' || currentPair.source === currentPair.target) return;
    const whitelist: LangCode[] = [currentPair.source, currentPair.target];
    try {
      await queryClient.cancelQueries({ queryKey: DETECT_AND_SWAP_QUERY_KEY });
      const res = await queryClient.fetchQuery({
        queryKey: DETECT_AND_SWAP_QUERY_KEY,
        queryFn: () => detectLang(text, whitelist)
      })
      if (res.lang_code !== currentPair.source)
        swapLangs();
    } catch (e) {
      console.error('Tauri detection error: ', e);
    }
  }, [queryClient]);

  return detectAndSwapLangs
}
