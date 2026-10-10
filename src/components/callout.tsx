import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TONE, type Tone } from "@/components/tone";

/**
 * A tip, a warning or a named rule, set apart on a solid tinted surface.
 * Never glass: what it says should not change with what is behind it.
 */
export function Callout({
  tone,
  icon: Icon,
  title,
  children,
  className,
}: {
  tone: Tone;
  icon?: LucideIcon;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border p-4", TONE[tone].surface, className)}>
      <div className="flex items-start gap-3">
        {Icon && (
          <Icon
            aria-hidden
            className={cn("mt-0.5 size-[1.125rem] shrink-0", TONE[tone].text)}
          />
        )}
        <div className="min-w-0 flex-1">
          <p className={cn("text-sm font-semibold", TONE[tone].text)}>
            {title}
          </p>
          {children && (
            <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
