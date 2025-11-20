import * as React from "react";
import { cn } from "@/lib/utils";

interface RangeSliderProps {
  label?: string;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
  helperLabels?: {
    left?: string;
    right?: string;
  };
}

const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      label,
      value,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      className,
      disabled = false,
      helperLabels,
      ...props
    },
    ref
  ) => {
    const [minValue, maxValue] = value;
    const range = max - min;

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = parseFloat(e.target.value);
      if (newMin <= maxValue) {
        onValueChange([newMin, maxValue]);
      } else {
        // If min exceeds max, swap them
        onValueChange([maxValue, newMin]);
      }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = parseFloat(e.target.value);
      if (newMax >= minValue) {
        onValueChange([minValue, newMax]);
      } else {
        // If max is less than min, swap them
        onValueChange([newMax, minValue]);
      }
    };

    const minPercent = ((minValue - min) / range) * 100;
    const maxPercent = ((maxValue - min) / range) * 100;

    return (
      <div ref={ref} className={cn("space-y-3 group", className)} {...props}>
        {label && (
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-stone-700">
              {label}
            </label>
            <span className="text-xs font-mono text-stone-500 bg-stone-50 px-1.5 py-0.5 rounded border border-stone-100">
              {minValue.toFixed(step < 1 ? 2 : 0)} -{" "}
              {maxValue.toFixed(step < 1 ? 2 : 0)}
            </span>
          </div>
        )}
        <div className="relative flex items-center h-4">
          <div className="relative w-full h-1 bg-stone-200 rounded-full">
            {/* Active range track */}
            <div
              className="absolute h-1 bg-orange-500 rounded-full"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
                top: "0px",
              }}
            />
            {/* Min thumb */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={minValue}
              onChange={handleMinChange}
              disabled={disabled}
              className={cn(
                "absolute w-full h-4 bg-transparent appearance-none cursor-pointer pointer-events-none z-10 pb-2",
                "accent-transparent",
                "top-1/2 -translate-y-1/2",
                "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[1.5px] [&::-webkit-slider-thumb]:border-stone-700 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-all",
                "[&::-webkit-slider-thumb]:hover:border-orange-500 [&::-webkit-slider-thumb]:hover:scale-110",
                "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[1.5px] [&::-moz-range-thumb]:border-stone-700 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:shadow-sm",
                "[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:rounded-full",
                "[&::-moz-range-track]:h-1 [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:rounded-full",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            />
            {/* Max thumb */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={maxValue}
              onChange={handleMaxChange}
              disabled={disabled}
              className={cn(
                "absolute w-full h-4 bg-transparent appearance-none cursor-pointer pointer-events-none z-10 pb-2",
                "accent-transparent",
                "top-1/2 -translate-y-1/2",
                "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[1.5px] [&::-webkit-slider-thumb]:border-stone-700 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-all",
                "[&::-webkit-slider-thumb]:hover:border-orange-500 [&::-webkit-slider-thumb]:hover:scale-110",
                "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[1.5px] [&::-moz-range-thumb]:border-stone-700 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:shadow-sm",
                "[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:rounded-full",
                "[&::-moz-range-track]:h-1 [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:rounded-full",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            />
          </div>
        </div>
        {helperLabels && (helperLabels.left || helperLabels.right) && (
          <div className="flex justify-between text-[10px] text-stone-400 pt-1">
            {helperLabels.left && <span>{helperLabels.left}</span>}
            {helperLabels.right && <span>{helperLabels.right}</span>}
          </div>
        )}
      </div>
    );
  }
);

RangeSlider.displayName = "RangeSlider";

export { RangeSlider };
