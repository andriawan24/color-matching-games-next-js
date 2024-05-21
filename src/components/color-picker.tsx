import { FormEvent, useRef, useState } from 'react'
import base from './color-picker.module.css'
import { hsl2Hex } from '@/utils/helper'

interface ColorPickerProps {
  onColorChanged: (value: string) => void
}

export default function ColorPicker({ onColorChanged }: ColorPickerProps) {

  const colorRangeRef = useRef<HTMLInputElement>(null);
  const [rangeValue, setRangeValue] = useState(50);

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setRangeValue(Number(event.currentTarget.value));
    var hue = ((Number(event.currentTarget.value)/100)*360).toFixed(0);
    var hsl = "hsl("+ hue + ", 100%, 50%)";
    var bgHsl = "hsl("+ hue + ", 100%, 95%)";
    var hex = hsl2Hex(Number(hue), 100, 50);
    colorRangeRef.current!.style!.color = hsl;
    onColorChanged(hex);
  }

  return (
    <>
      <input ref={colorRangeRef} type="range" className={base.color_range} min={0} max={100} value={rangeValue} onInput={(e) => handleInput(e)} />
    </>
  )
}