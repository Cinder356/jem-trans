import { useMemo, useCallback, useRef, useState, createContext, type PropsWithChildren, type Dispatch } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { type LangCode } from '@/app/consts/languages';
import useTranslator from '../hooks/useTranslator';


export interface LangPair {
  source: LangCode | 'auto';
  target: LangCode;
}

type UpdateLangPairFn = (value: Partial<LangPair>) => void;
type DetectAndSwapLangsFn = () => void;
type GetSourceTextFn = () => string;
type UpdateSourceTextFn = (value: string) => void;

const DEFAULT_LANG_PAIR: LangPair = {
  source: 'auto',
  target: 'eng'
} as const;

const queryKey = ['detect-lang'];

export interface TranslationContextValue {
  langPair: LangPair;
  updateLangPair: UpdateLangPairFn;
  detectAndSwapLangs: DetectAndSwapLangsFn;
  getSourceText: GetSourceTextFn;
  updateSourceText: UpdateSourceTextFn;
  translation: string;
  setTranslation: Dispatch<string>;
  swapLangs: () => void;
}

export const TranslationContext = createContext<TranslationContextValue | null>(null);

export const TranslationProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const { detectLang } = useTranslator();
  const langPairRef = useRef<LangPair>(DEFAULT_LANG_PAIR);
  const [langPair, setLangPair] = useState<LangPair>(DEFAULT_LANG_PAIR);
  const sourceTextRef = useRef<string>('');
  const [translation, setTranslation] = useState<string>('');

  const updateLangPair: UpdateLangPairFn = useCallback((value) => {
    queryClient.cancelQueries({ queryKey });
    langPairRef.current = { ...langPairRef.current, ...value };
    setLangPair(prev => {
      return { ...prev, ...value }
    });
  }, [])

  const detectAndSwapLangs: DetectAndSwapLangsFn = useCallback(async () => {
    const text = sourceTextRef.current;
    const currentPair = langPairRef.current;
    if (!text || currentPair.source === 'auto' || currentPair.source === currentPair.target) return;
    const whitelist: LangCode[] = [currentPair.source, currentPair.target];
    try {
      await queryClient.cancelQueries({ queryKey });
      const res = await queryClient.fetchQuery({
        queryKey,
        queryFn: () => detectLang(text, whitelist)
      })
      if (res.lang_code !== currentPair.source) {
        const newPair: LangPair = { source: currentPair.target, target: currentPair.source };
        langPairRef.current = newPair;
        setLangPair(newPair);
      }
    } catch (e) {
      console.error('Tauri detection error: ', e);
    }
  }, [queryClient, updateLangPair]);

  const getSourceText: GetSourceTextFn = useCallback(() => sourceTextRef.current, []);
  const updateSourceText: UpdateSourceTextFn = useCallback((value) => { sourceTextRef.current = value }, []);

  const swapLangs = useCallback(() => {
    if (langPairRef.current.source === 'auto') return;
    updateLangPair({
      source: langPairRef.current.target,
      target: langPairRef.current.source
    });
  }, [])

  const contextValue = useMemo<TranslationContextValue>(() => ({
    langPair,
    updateLangPair,
    detectAndSwapLangs,
    getSourceText,
    updateSourceText,
    translation,
    setTranslation,
    swapLangs
  }), [langPair, translation, detectAndSwapLangs, updateLangPair, getSourceText, swapLangs])

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  )
}
