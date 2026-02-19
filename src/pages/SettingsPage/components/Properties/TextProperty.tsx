import { Input } from '@/components/ui/input';
import LabelWithHint from '../LabelWithHint';
import { ComponentProps } from 'react';

interface TextPropertyProps extends Omit<ComponentProps<typeof Input>, "onChange"> {
  id: string;
  label: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  hint?: string;
}

export default function ({ id, label, defaultValue, onChange, hint, ...props }: TextPropertyProps) {

  return (
    <div className='grid w-full items-center gap-1'>
      <LabelWithHint htmlFor={id} label={label} hint={hint} />
      <Input {...props} defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
        id={id} />
    </div>
  )
}
