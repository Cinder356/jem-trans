import { useState } from 'react';
import { Slider } from "@/components/ui/slider"
import { Label } from "@radix-ui/react-label"

interface SliderPropertyProps {
  label: string;
  defaultValue: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export default ({ label, defaultValue, max, step, onChange }: SliderPropertyProps) => {
  const [sliderValue, setSliderValue] = useState(defaultValue);

  return (
    <div>
      <div className="flex justify-between">
        <Label>{label}:</Label>
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
