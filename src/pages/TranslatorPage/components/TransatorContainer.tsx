import { type ChangeEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import useTranslation from '../hooks/useTranslation';
import useTranslator from '../hooks/useTranslator';
import { Input } from '@/components/ui/input';

export default () => {
  const { getSourceText, updateSourceText, translation, setTranslation, langPair, updateLangPair, detectAndSwapLangs } = useTranslation();
  const { translateViaLlm } = useTranslator();

  console.log("СУКА, РЕНДЕР!!");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateSourceText(e.target.value);
    detectAndSwapLangs();
  }

  const handleTranslate = () => {
    translateViaLlm({
      term: getSourceText(),
      sourceLang: langPair.source,
      targetLang: langPair.target
    })
      .then(value => setTranslation(value.translation))
      .catch(() => setTranslation('error :('))
  }

  return (
    <div className="grid gap-2 mt-2 grid-cols-2 grid-rows-[auto_auto]">
      <Textarea className='flex-1 resize-none min-h-30' onChange={handleChange} />
      <Textarea className='flex-1 resize-none' readOnly value={translation} />
      <div className="flex gap-2 justify-center col-span-2 row-start-2 row-end-2">
        <Button size='sm' onClick={handleTranslate}>Translate</Button>
      </div>
    </div >
  )
}
