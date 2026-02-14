import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import LabelWithHint from "../LabelWithHint";

interface TextPropertyProps<T extends string> {
  selectItems: { value: T, label: string }[];
  label: string;
  defaultValue?: T;
  onChange: (value: T) => void;
  hint?: string;
}

export default function <T extends string>({ selectItems, label, defaultValue, onChange, hint }: TextPropertyProps<T>) {

  return (
    <div className='grid w-full items-center gap-1.5'>
      <LabelWithHint label={label} hint={hint} />
      <Select defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger className="flex w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {selectItems.map(({ value, label }) =>
            <SelectItem value={value}>{label}</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
