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
import { JukasLogoMark } from "@/components/jukas-logo";
import {
  Zap,
  BarChart3,
  Layers,
  BookOpen,
  Menu,
  Home,
  Play,
} from "lucide-react";

const navItems = [
  { href: "/setup", label: "Setup", icon: Zap },
  { href: "/scores", label: "Scores", icon: BarChart3 },
  { href: "/cards", label: "Cards", icon: Layers },
];

const sheetNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/setup", label: "Quick Setup", icon: Zap },
  { href: "/scores", label: "Score Keeper", icon: BarChart3 },
  { href: "/cards", label: "Card Reference", icon: Layers },
  { href: "/rules", label: "Full Rules", icon: BookOpen },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="md:hidden">
      {/* Fixed bottom navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/30 safe-bottom">
        <div className="flex items-center justify-around py-1.5 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl transition-all duration-200 press-effect ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-primary shadow-lg shadow-primary/40" />
                )}
                <Icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    active ? "text-primary" : ""
                  }`}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span
                  className={`text-[10px] font-medium transition-all duration-200 ${
                    active ? "text-primary" : ""
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl text-muted-foreground hover:text-foreground transition-all duration-200 press-effect">
                <Menu className="w-5 h-5" strokeWidth={2} />
                <span className="text-[10px] font-medium">More</span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="rounded-t-3xl glass-strong border-t border-border/30"
            >
              <SheetHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <JukasLogoMark size={40} />
                  <div>
                    <SheetTitle className="text-xl text-left">Jukas</SheetTitle>
                    <p className="text-xs text-muted-foreground text-left">
                      The Card Game
                    </p>
                  </div>
                </div>
              </SheetHeader>

              <Separator className="mb-3 bg-border/30" />

              <nav className="space-y-1">
                {sheetNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-4 p-3.5 rounded-xl transition-all duration-150 press-effect ${
                        active
                          ? "bg-primary/15 text-primary border border-primary/20"
                          : "hover:bg-muted/50 border border-transparent"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          active
                            ? "bg-primary/20"
                            : "bg-muted/50"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            active ? "text-primary" : "text-muted-foreground"
                          }`}
                          strokeWidth={active ? 2.5 : 2}
                        />
                      </div>
                      <span
                        className={`text-base font-medium ${
                          active ? "text-primary" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <Separator className="my-3 bg-border/30" />

              <div className="pb-4">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 h-12 text-base font-semibold press-effect"
                  asChild
                >
                  <Link href="/scores" onClick={() => setOpen(false)}>
                    <Play className="w-5 h-5 mr-2" />
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
