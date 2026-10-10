"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JukasLogoMark } from "@/components/jukas-logo";
import { NAV_ITEMS } from "@/components/nav-items";
import { cn } from "@/lib/utils";

/**
 * The header floats: a glass bar inset from the top and sides of the window.
 * On a phone it scrolls away with the page (the tab bar is the navigation
 * there, and the score keeper's own bar needs the top edge); from `md` up it
 * sticks and carries the navigation.
 *
 * The outer element takes no pointer events, so the gutter around the bar
 * never swallows a press meant for the page beneath it.
 */
export function SiteHeader() {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none top-0 z-40 px-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))] sm:px-6 md:sticky">
      <div className="pointer-events-auto mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-2xl border border-border pr-2 pl-3 shadow-card glass-chrome">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-2.5 rounded-lg pr-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <JukasLogoMark
            size={32}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            Jukas
          </span>
        </Link>

        <span className="pr-2 text-xs font-medium text-muted-foreground md:hidden">
          The Card Game
        </span>

        <nav aria-label="Site" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.slice(1).map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-10 items-center gap-2 rounded-md px-3.5 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  active
                    ? "bg-raised text-foreground shadow-raised"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>

        <Button asChild size="sm" className="hidden md:inline-flex">
          <Link href="/scores">
            <Play />
            Play
          </Link>
        </Button>
      </div>
    </div>
  );
}
