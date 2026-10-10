import type { LucideIcon } from "lucide-react";
import { IconTile } from "@/components/icon-tile";

/** The title block every page opens with. */
export function PageHeader({
  icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-6 flex items-center gap-4 sm:mb-8">
      <IconTile icon={icon} size="lg" />
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
    </header>
  );
}
