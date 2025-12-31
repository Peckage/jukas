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
      {/* Fixed bottom navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 safe-bottom">
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

              <div className="pb-6">
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
