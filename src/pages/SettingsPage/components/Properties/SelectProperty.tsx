import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";
import LabelWithHint from "../LabelWithHint";

interface TextPropertyProps<T extends string> {
  selectItems: { value: T, label: string }[];
  label: string;
  className?: string;
  value?: T;
  defaultValue?: T;
  onChange: (value: T) => void;
  hint?: string;
  placeholder?: string;
}

export default function <T extends string>({ selectItems, label, className, value, defaultValue, onChange, hint, placeholder }: TextPropertyProps<T>) {
  return (
    <div className={cn([
      'grid w-full items-center gap-1.5',
      className
    ])}>
      <LabelWithHint label={label} hint={hint} />
      <Select value={value} defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger className="flex w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {selectItems.map(({ value: itemValue, label }) =>
            <SelectItem key={itemValue} value={itemValue}>{label}</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div >
  )
}
