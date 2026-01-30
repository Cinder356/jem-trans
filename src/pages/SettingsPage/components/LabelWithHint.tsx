import { Label } from "@radix-ui/react-label"
import Tooltip from "@/components/ui/Tooltip"
import { CircleAlert } from "lucide-react"
import { type LabelProps } from "@radix-ui/react-label"

type LabelWithHintProps = {
  label: string;
  hint?: string;
} & LabelProps;

export default function ({ label, hint, ...props }: LabelWithHintProps) {
  return (
    <Label className='flex items-center gap-1' {...props}>
      {label}:
      {hint && <Tooltip hint={hint} viewportMargin={40}>
        <CircleAlert size="1em" />
      </Tooltip>}
    </Label>
  )
}
