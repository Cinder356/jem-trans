import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextPropertyProps {
  id: string;
  label: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

export default function ({ id, label, defaultValue, onChange }: TextPropertyProps) {

  return (
    <div className='grid w-full items-center gap-1.5'>
      <Label className='text-inherit' htmlFor={id}>{label}: </Label>
      <Input defaultValue={defaultValue || ''} onChange={(e) => onChange(e.target.value)} className='h-8' id={id} />
    </div>
  )
}
