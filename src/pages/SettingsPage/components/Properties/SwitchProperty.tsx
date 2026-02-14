import { Switch } from '@/components/ui/switch';
import LabelWithHint from '../LabelWithHint';

interface SwitchPropertyProps {
  id: string;
  label: string;
  defaultValue: boolean;
  onChange?: (value: boolean) => void;
  hint?: string;
}


export default ({ id, label, defaultValue, onChange, hint }: SwitchPropertyProps) => {
  return (
    <div className='flex w-full max-w-xs justify-between mx-auto items-center'>
      <LabelWithHint htmlFor={id} label={label} hint={hint} />
      <Switch id={id} defaultChecked={defaultValue} onCheckedChange={onChange} />
    </div>
  )
}
