import { type ChangeEvent } from 'react';
import { ChevronsRightIcon, MicIcon, Volume2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import useTranslation from '../hooks/useTranslation';
import useSettings from '@/app/hooks/useSettings';
import useDetectAndSwap from '../hooks/useDetectAndSwap';

export default () => {
  const { getProperty } = useSettings();
  const detectAndSwapLangs = useDetectAndSwap();
  const {
    translationResult: { translation, isFetching },
    translateCurrent, updateSourceText, langPair
  } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const sourceValue = e.target.value;
    updateSourceText(sourceValue);
    detectAndSwapLangs(sourceValue, langPair);
  }

  const handleTranslate = () => {
    translateCurrent();
  }

  return (
    <div className="grid gap-2 mt-2 grid-cols-2 grid-rows-[auto_auto]">
      <div className="relative">
        <Textarea className='flex-1 resize-none min-h-40' onChange={handleChange} />
        <div className="absolute bottom-1.5 right-1.5 flex items-center gap-2">
          <div className='flex gap-1.5 p-0.5'>
            <Volume2 className='cursor-pointer' />
            <MicIcon className='cursor-pointer' />
            {!getProperty('isAutoTranslateEnabled') &&
              <ChevronsRightIcon onClick={handleTranslate} className='cursor-pointer' />
            }
          </div>
        </div>
      </div>
      <div className="relative">
        <div aria-busy={isFetching} className={cn(
          'transition-opacity duration-400 ease-in-out',
          isFetching && 'opacity-50'
        )}>
          <Textarea className='flex-1 resize-none min-h-40' readOnly value={translation} />
          <div className="absolute bottom-1.5 right-1.5 flex items-center gap-2 p-0.5">
            <Volume2 className='cursor-pointer' />
          </div>
        </div>
        {isFetching && <Spinner className='size-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />}
      </div>
    </div >
  )
}
