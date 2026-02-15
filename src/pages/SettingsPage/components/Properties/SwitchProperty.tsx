import { Switch } from '@/components/ui/switch';
import LabelWithHint from '../LabelWithHint';

interface SwitchPropertyProps {
  id: string;
  label: string;
  checked?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  hint?: string;
}


export default ({ id, label, checked, defaultValue, onChange, hint }: SwitchPropertyProps) => {
  return (
    <div className='flex w-full max-w-xs justify-between mx-auto items-center'>
      <LabelWithHint htmlFor={id} label={label} hint={hint} />
      <Switch id={id} checked={checked} defaultChecked={defaultValue} onCheckedChange={onChange} />
    </div>
  )
}
