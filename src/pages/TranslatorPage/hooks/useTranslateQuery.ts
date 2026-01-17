import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import useTranslator, { type TranslateParams, type TranslateResponse } from './useTranslator';


export type UseTranslateQueryOptions = TranslateParams;
export type UseTranslateQueryResult = {
  translation: string;
} & Pick<UseQueryResult<TranslateResponse>, 'isFetching' | 'isError' | 'error'>

export default ({ term, sourceLang, targetLang }: UseTranslateQueryOptions): UseTranslateQueryResult => {
  const { translateViaLlm } = useTranslator();

  const isEnabled = !!term && term.trim().length > 0;

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['transalte-key', term, sourceLang, targetLang],
    queryFn: () => translateViaLlm({
      term,
      sourceLang,
      targetLang
    }),
    enabled: isEnabled,
    retry: false,
  })

  const translation = data?.translation ?? '';

  return {
    translation,
    isFetching,
    isError,
    error
  }
}
