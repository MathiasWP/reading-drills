"use client";

interface SpeedControlProps {
  wpm: number;
  onChange: (wpm: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function SpeedControl({
  wpm,
  onChange,
  min = 100,
  max = 1400,
  step = 25,
}: SpeedControlProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-xs text-ink-faint uppercase tracking-wide whitespace-nowrap">
        Speed
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={wpm}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 min-w-[100px]"
      />
      <span className="text-sm font-medium tabular-nums w-20 text-right">
        {wpm} WPM
      </span>
    </div>
  );
}
