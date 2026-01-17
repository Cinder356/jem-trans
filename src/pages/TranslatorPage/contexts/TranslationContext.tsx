import { useMemo, useCallback, useRef, useState, createContext, type PropsWithChildren, type Dispatch } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { LangPair } from '@/app/types/Langs';
import { DETECT_AND_SWAP_QUERY_KEY } from '../hooks/useDetectAndSwap';


type UpdateLangPairFn = (value: Partial<LangPair>) => void;
type GetSourceTextFn = () => string;
type UpdateSourceTextFn = (value: string) => void;

const DEFAULT_LANG_PAIR: LangPair = {
  source: 'auto',
  target: 'eng'
} as const;

export interface TranslationContextValue {
  langPair: LangPair;
  updateLangPair: UpdateLangPairFn;
  getSourceText: GetSourceTextFn;
  updateSourceText: UpdateSourceTextFn;
  translation: string;
  setTranslation: Dispatch<string>;
  swapLangs: () => void;
}

export const TranslationContext = createContext<TranslationContextValue | null>(null);

export const TranslationProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const [langPair, setLangPair] = useState<LangPair>(DEFAULT_LANG_PAIR);
  const sourceTextRef = useRef<string>('');
  const [translation, setTranslation] = useState<string>('');

  const updateLangPair: UpdateLangPairFn = useCallback((value) => {
    queryClient.cancelQueries({ queryKey: DETECT_AND_SWAP_QUERY_KEY });
    setLangPair(prev => ({ ...prev, ...value }));
  }, [])

  const getSourceText: GetSourceTextFn = useCallback(() => sourceTextRef.current, []);
  const updateSourceText: UpdateSourceTextFn = useCallback((value) => { sourceTextRef.current = value }, []);

  const swapLangs = useCallback(() => {
    setLangPair(prev => {
      if (prev.source === 'auto') return prev;
      return { source: prev.target, target: prev.source };
    });
  }, [])

  const contextValue = useMemo<TranslationContextValue>(() => ({
    langPair,
    updateLangPair,
    getSourceText,
    updateSourceText,
    translation,
    setTranslation,
    swapLangs
  }), [langPair, translation, updateLangPair, getSourceText, swapLangs])

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  )
}
