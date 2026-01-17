import { useMemo, useCallback, useRef, useState, createContext, type PropsWithChildren } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { LangPair } from '@/app/types/Langs';
import { DETECT_AND_SWAP_QUERY_KEY } from '../hooks/useDetectAndSwap';
import useTranslateQuery, { type UseTranslateQueryResult } from '../hooks/useTranslateQuery';
import { useDebouncedCallback } from '@/app/hooks/useDebouncedCallback';
import useSettings from '@/app/hooks/useSettings';

type UpdateLangPairFn = (value: Partial<LangPair>) => void;
type GetSourceTextFn = () => string;
type UpdateSourceTextFn = (value: string) => void;

const DEFAULT_LANG_PAIR: LangPair = {
  source: 'auto',
  target: 'eng'
} as const;

export interface TranslationContextValue {
  translationResult: UseTranslateQueryResult;
  langPair: LangPair;
  translateCurrent: () => void;
  updateLangPair: UpdateLangPairFn;
  getSourceText: GetSourceTextFn;
  updateSourceText: UpdateSourceTextFn;
  swapLangs: () => void;
}

export const TranslationContext = createContext<TranslationContextValue | null>(null);

export const TranslationProvider = ({ children }: PropsWithChildren) => {
  const { getProperty } = useSettings();
  const queryClient = useQueryClient();
  const [langPair, setLangPair] = useState<LangPair>(DEFAULT_LANG_PAIR);
  const sourceTextRef = useRef<string>('');
  const [textForQuery, setTextForQuery] = useState('');
  const translationResult = useTranslateQuery({ term: textForQuery, sourceLang: langPair.source, targetLang: langPair.target });

  const [setTextForQueryDebounced, preventChangingTextForQuery]
    = useDebouncedCallback((value: string) => setTextForQuery(value), getProperty('autoTranslateDelay'));

  const updateLangPair: UpdateLangPairFn = useCallback((value) => {
    queryClient.cancelQueries({ queryKey: DETECT_AND_SWAP_QUERY_KEY });
    setLangPair(prev => ({ ...prev, ...value }));
  }, [])

  const getSourceText: GetSourceTextFn = useCallback(() => sourceTextRef.current, []);
  const updateSourceText: UpdateSourceTextFn = useCallback((value) => {
    const trimmedValue = value.trim();
    sourceTextRef.current = trimmedValue;
    if (getProperty('isAutoTranslateEnabled'))
      if (trimmedValue)
        setTextForQueryDebounced(trimmedValue);
      else {
        preventChangingTextForQuery();
        setTextForQuery('');
      }
  }, []);

  const swapLangs = useCallback(() => {
    setLangPair(prev => {
      if (prev.source === 'auto') return prev;
      return { source: prev.target, target: prev.source };
    });
  }, [])

  const translateCurrent = useCallback(() => setTextForQuery(sourceTextRef.current), []);

  const contextValue = useMemo<TranslationContextValue>(() => ({
    translationResult,
    langPair,
    translateCurrent,
    updateLangPair,
    getSourceText,
    updateSourceText,
    swapLangs
  }), [translationResult, langPair, translateCurrent, updateLangPair, getSourceText, swapLangs])

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  )
}
