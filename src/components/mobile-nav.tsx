"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/setup", label: "Quick Setup", icon: "⚡" },
    { href: "/scores", label: "Score Keeper", icon: "📊" },
    { href: "/cards", label: "Card Reference", icon: "🃏" },
    { href: "/rules", label: "Full Rules", icon: "📖" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="md:hidden">
      {/* Fixed bottom navigation bar with integrated footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 safe-bottom">
        {/* Mini footer row */}
        <div className="flex items-center justify-between px-4 py-1.5 border-b border-border/30 text-[10px] text-muted-foreground">
          <span>© {new Date().getFullYear()} Jukas</span>
          <a
            href="https://github.com/mirkodandrea"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
        {/* Navigation row */}
        <div className="flex items-center justify-around py-2 px-4">
          <Link
            href="/setup"
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              isActive("/setup")
                ? "bg-orange-600/20 text-orange-300"
                : "hover:bg-muted/50"
            }`}
          >
            <svg
              className={`w-5 h-5 ${
                isActive("/setup") ? "text-orange-400" : "text-muted-foreground"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span
              className={`text-xs ${
                isActive("/setup") ? "text-orange-300" : "text-muted-foreground"
              }`}
            >
              Setup
            </span>
          </Link>

          <Link
            href="/scores"
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              isActive("/scores")
                ? "bg-orange-600/20 text-orange-300"
                : "hover:bg-muted/50"
            }`}
          >
            <svg
              className={`w-5 h-5 ${
                isActive("/scores")
                  ? "text-orange-400"
                  : "text-muted-foreground"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span
              className={`text-xs ${
                isActive("/scores")
                  ? "text-orange-300"
                  : "text-muted-foreground"
              }`}
            >
              Scores
            </span>
          </Link>

          <Link
            href="/cards"
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              isActive("/cards")
                ? "bg-orange-600/20 text-orange-300"
                : "hover:bg-muted/50"
            }`}
          >
            <svg
              className={`w-5 h-5 ${
                isActive("/cards") ? "text-orange-400" : "text-muted-foreground"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span
              className={`text-xs ${
                isActive("/cards") ? "text-orange-300" : "text-muted-foreground"
              }`}
            >
              Cards
            </span>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors">
                <svg
                  className="w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span className="text-xs text-muted-foreground">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl glass">
              <SheetHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">J</span>
                  </div>
                  <SheetTitle className="text-xl">Jukas</SheetTitle>
                </div>
              </SheetHeader>

              <Separator className="mb-4" />

              <nav className="space-y-2">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                    pathname === "/"
                      ? "bg-orange-600/20 text-orange-300"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <span className="text-2xl">🏠</span>
                  <span className="text-lg font-medium">Home</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                      isActive(item.href)
                        ? "bg-orange-600/20 text-orange-300"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-lg font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>

              <Separator className="my-4" />

              <div className="pb-4">
                <Button
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500"
                  size="lg"
                  asChild
                >
                  <Link href="/scores" onClick={() => setOpen(false)}>
                    Start Playing
                  </Link>
                </Button>
              </div>

              <Separator className="mb-4" />

              {/* Footer content */}
              <div className="flex items-center justify-between pb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <span className="text-white font-bold text-[10px]">J</span>
                  </div>
                  <span>© {new Date().getFullYear()} Jukas</span>
                </div>
                <a
                  href="https://github.com/mirkodandrea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
