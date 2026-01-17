import { type ChangeEvent } from 'react';
import { ChevronsRightIcon, MicIcon, Volume2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import useTranslation from '../hooks/useTranslation';
import useTranslator from '../hooks/useTranslator';
import useSettings from '@/app/hooks/useSettings';
import useDetectAndSwap from '../hooks/useDetectAndSwap';

export default () => {
  const { getProperty } = useSettings();
  const { getSourceText, updateSourceText, translation, setTranslation, langPair } = useTranslation();
  const { translateViaLlm } = useTranslator();
  const detectAndSwapLangs = useDetectAndSwap();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const sourceValue = e.target.value;
    updateSourceText(sourceValue);
    detectAndSwapLangs(sourceValue, langPair);
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
      <div className="relative">
        <Textarea className='flex-1 resize-none min-h-40' onChange={handleChange} />
        <div className="absolute bottom-1.5 right-1.5 flex items-center gap-2">
          <div className='flex gap-1.5 p-0.5'>
            <Volume2 className='cursor-pointer' />
            <MicIcon className='cursor-pointer' />
            {!getProperty('languagesAutoChange') &&
              <ChevronsRightIcon onClick={handleTranslate} className='cursor-pointer' />
            }
          </div>
        </div>
      </div>
      <div className="relative">
        <Textarea className='flex-1 resize-none min-h-40' readOnly value={translation} />
        <div className="absolute bottom-1.5 right-1.5 flex items-center gap-2 p-0.5">
          <Volume2 className='cursor-pointer' />
        </div>
      </div>
      {/* <div className="flex gap-2 justify-center col-span-2 row-start-2 row-end-2"> */}
      {/* </div> */}
    </div >
  )
}
