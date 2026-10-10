"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/components/nav-items";
import { cn } from "@/lib/utils";

/**
 * The phone's navigation, laid out like a native tab bar: docked glass along
 * the bottom edge, the current tab marked by a raised capsule behind its
 * icon.
 *
 * The bar paints across the home-indicator inset, so the inset lives inside
 * each tab rather than as padding on the bar: every tab's hit area reaches
 * the bottom edge, and the icon and label stay above the indicator.
 */
export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border shadow-[inset_0_1px_0_var(--card-highlight),0_-12px_32px_-16px_var(--glass-shadow)] glass-chrome md:hidden"
    >
      <div className="flex h-[calc(3.75rem+env(safe-area-inset-bottom,0px))] items-stretch px-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group/tab flex min-w-0 flex-1 touch-manipulation flex-col items-center justify-center gap-1 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))] outline-none select-none focus-visible:bg-accent",
                active
                  ? "text-primary"
                  : "text-muted-foreground active:text-foreground"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "flex h-8 w-14 items-center justify-center rounded-full transition-[background-color,box-shadow,scale] duration-200 group-active/tab:scale-90",
                  active && "bg-raised shadow-raised"
                )}
              >
                <Icon className={cn("size-5", active && "stroke-[2.25]")} />
              </span>
              <span
                className={cn(
                  "text-2xs leading-none",
                  active ? "font-semibold" : "font-medium"
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
