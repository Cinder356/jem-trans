import { Input } from '@/components/ui/input';
import LabelWithHint from './LabelWithHint';

interface TextPropertyProps {
  id: string;
  label: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  hint?: string;
}

export default function ({ id, label, defaultValue, onChange, hint }: TextPropertyProps) {

  return (
    <div className='grid w-full items-center gap-1.5'>
      <LabelWithHint htmlFor={id} label={label} hint={hint} />
      <Input defaultValue={defaultValue || ''} onChange={(e) => onChange(e.target.value)} className='h-8' id={id} />
    </div>
  )
}
