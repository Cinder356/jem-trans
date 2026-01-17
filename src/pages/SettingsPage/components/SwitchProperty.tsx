import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface SwitchPropertyProps {
  id: string;
  label: string;
  defaultValue: boolean;
  onChange?: (value: boolean) => void;
}


export default ({ id, label, defaultValue, onChange }: SwitchPropertyProps) => {
  return (
    <div className='flex w-full max-w-xs justify-between mx-auto'>
      <Label htmlFor={id}>{label}: </Label>
      <Switch id={id} defaultChecked={defaultValue} onCheckedChange={onChange} />
    </div>
  )
}
