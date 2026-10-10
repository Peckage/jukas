import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  Brain,
  ChevronRight,
  Clock,
  Layers,
  Play,
  RefreshCw,
  Skull,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/icon-tile";
import { JukasLogo } from "@/components/jukas-logo";

const FACTS = [
  { icon: Users, label: "2–6 players" },
  { icon: Clock, label: "5–10 min a round" },
  { icon: Skull, label: "Out at 100" },
];

const TOOLS: {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    href: "/scores",
    icon: BarChart3,
    title: "Score keeper",
    description: "Track every round. The game is saved, so you can pick it up later.",
  },
  {
    href: "/setup",
    icon: Zap,
    title: "Quick setup",
    description: "Deal, lay out and play your first turn in under a minute.",
  },
  {
    href: "/cards",
    icon: Layers,
    title: "Card reference",
    description: "What every card is worth and what it does, at a glance.",
  },
  {
    href: "/rules",
    icon: BookOpen,
    title: "Full rules",
    description: "Turns, snatching, calling “Jukas!” and how to win.",
  },
];

const REASONS = [
  {
    icon: Users,
    title: "2–6 players",
    description: "A quick round for two or a full game night with friends.",
  },
  {
    icon: RefreshCw,
    title: "Round after round",
    description: "Scores add up until one survivor is left under 100.",
  },
  {
    icon: Brain,
    title: "Memory and nerve",
    description: "Remember the cards, bluff your opponents, call it at the right time.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      {/* Hero */}
      <section className="flex flex-col items-center pt-10 pb-12 text-center sm:pt-16 sm:pb-16">
        <div className="animate-float">
          <JukasLogo size={88} className="drop-shadow-2xl" />
        </div>

        <p className="mt-6 text-xs font-semibold tracking-wider text-primary uppercase">
          The card game
        </p>
        <h1 className="mt-2 font-display text-5xl font-bold tracking-tight sm:text-6xl">
          Jukas
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          A fast, memory-driven elimination game of risk, deduction and
          sabotage. Stay under 100 points to survive.
        </p>

        <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <Button asChild size="lg">
            <Link href="/scores">
              <Play />
              Start a game
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/setup">
              <Zap />
              Quick setup
            </Link>
          </Button>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {FACTS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex h-8 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-medium text-muted-foreground shadow-control glass-control"
            >
              <Icon className="size-3.5" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </section>

      {/* The four tools. A list of rows on a phone, a grid of cards above. */}
      <section aria-labelledby="tools-heading" className="pb-12 sm:pb-16">
        <h2 id="tools-heading" className="sr-only">
          At the table
        </h2>
        <ul className="overflow-hidden rounded-2xl border border-border shadow-card glass-panel sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent sm:shadow-none">
          {TOOLS.map(({ href, icon, title, description }) => (
            <li
              key={href}
              className="border-b border-border last:border-b-0 sm:border-b-0"
            >
              <Link
                href={href}
                className="group flex min-h-18 items-center gap-4 p-4 transition-colors outline-none hover:bg-accent focus-visible:bg-accent active:bg-accent sm:h-full sm:items-start sm:rounded-xl sm:border sm:border-border sm:p-5 sm:shadow-card sm:glass-panel sm:hover:border-border-strong"
              >
                <IconTile icon={icon} />
                <div className="min-w-0 flex-1">
                  <p className="font-display font-semibold">{title}</p>
                  <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
                    {description}
                  </p>
                </div>
                <ChevronRight
                  aria-hidden
                  className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 sm:self-center"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Why play */}
      <section
        aria-labelledby="why-heading"
        className="border-t border-border py-12 sm:py-16"
      >
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-wider text-primary uppercase">
            Why play
          </p>
          <h2
            id="why-heading"
            className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Luck, memory and strategy
          </h2>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {REASONS.map(({ icon, title, description }) => (
            <li
              key={title}
              className="flex items-start gap-4 rounded-xl border border-border p-4 shadow-card glass-panel sm:flex-col sm:gap-3 sm:p-5"
            >
              <IconTile icon={icon} />
              <div>
                <p className="font-display font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
