import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TONE, type Tone } from "@/components/tone";

const SIZE = {
  sm: "size-8 rounded-md [&>svg]:size-4",
  md: "size-10 rounded-lg [&>svg]:size-5",
  lg: "size-12 rounded-xl [&>svg]:size-6",
} as const;

/** An icon on a small outlined tile, tinted by its tone. */
export function IconTile({
  icon: Icon,
  tone = "primary",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: Tone;
  size?: keyof typeof SIZE;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center border shadow-control",
        TONE[tone].surface,
        TONE[tone].text,
        SIZE[size],
        className
      )}
    >
      <Icon />
    </span>
  );
}
