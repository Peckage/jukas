import { cn } from "@/lib/utils";

/** A row of mutually exclusive choices; the chosen one is raised. */
export function Segmented<T extends string | number | null>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex gap-1 rounded-lg border border-border p-1 glass-control"
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.label}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "press h-9 min-w-0 flex-1 rounded-md px-2 text-sm font-medium tabular-nums outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
              selected
                ? "bg-raised text-foreground shadow-raised"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
