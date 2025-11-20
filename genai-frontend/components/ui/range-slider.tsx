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
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {label && (
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-foreground">
              {label}
            </label>
            <span className="text-sm text-muted-foreground">
              {minValue.toFixed(step < 1 ? 2 : 0)} -{" "}
              {maxValue.toFixed(step < 1 ? 2 : 0)}
            </span>
          </div>
        )}
        <div className="relative h-2 bg-gray-200 rounded-lg">
          {/* Active range track */}
          <div
            className="absolute h-2 bg-orange-500 rounded-lg"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
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
              "absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none z-10",
              "accent-transparent",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20",
              "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto",
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
              "absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none z-10",
              "accent-transparent",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20",
              "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          />
        </div>
      </div>
    );
  }
);

RangeSlider.displayName = "RangeSlider";

export { RangeSlider };
