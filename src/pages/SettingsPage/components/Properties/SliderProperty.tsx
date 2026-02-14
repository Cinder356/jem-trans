import { useState } from 'react';
import { Slider } from "@/components/ui/slider"
import LabelWithHint from '../LabelWithHint';

interface SliderPropertyProps {
  label: string;
  defaultValue: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  hint: string;
}

export default ({ label, defaultValue, max, step, onChange, hint }: SliderPropertyProps) => {
  const [sliderValue, setSliderValue] = useState(defaultValue);

  return (
    <div>
      <div className="flex justify-between">
        <LabelWithHint label={label} hint={hint} />
        <p>{sliderValue}</p>
      </div>
      <Slider
        className="mt-1.5"
        defaultValue={[defaultValue]}
        max={max}
        step={step}
        onValueChange={([value]) => {
          setSliderValue(value)
          onChange(value);
        }}
      />
    </div>
  )
}
