import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Clock,
  Eye,
  Flag,
  Gamepad2,
  Hand,
  Layers,
  Lightbulb,
  Search,
  Settings,
  Shuffle,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { Callout } from "@/components/callout";
import { IconTile } from "@/components/icon-tile";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "setup", label: "Setup" },
  { id: "play", label: "Play" },
  { id: "effects", label: "Effects" },
  { id: "scoring", label: "Scoring" },
  { id: "winning", label: "Winning" },
  { id: "tips", label: "Tips" },
];

function Section({
  id,
  icon,
  title,
  children,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    // Clears the sticky chip row on a phone and the sticky header above it.
    <Card id={id} className="scroll-mt-20 md:scroll-mt-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg">
          <IconTile icon={icon} size="sm" />
          <h2>{title}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-1.5 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2.5">
          <span
            aria-hidden
            className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Steps({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="space-y-2 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2.5">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-border text-2xs font-semibold text-foreground glass-control">
            {index + 1}
          </span>
          <span className="pt-px">{item}</span>
        </li>
      ))}
    </ol>
  );
}

const FACTS = [
  { icon: Users, text: "2–6 players" },
  { icon: Clock, text: "5–10 minutes a round" },
  { icon: Target, text: "Stay under 100 points" },
  { icon: Layers, text: "A standard deck" },
];

const SETUP = [
  {
    title: "Deal cards",
    text: "Each player gets 4 cards face down in a 2×2 grid. Don’t look yet!",
  },
  {
    title: "Make the piles",
    text: "The rest is the draw pile. Flip its top card to start the discard pile.",
  },
  {
    title: "First peek",
    text: "Each player looks at any 2 of their 4 cards, then puts them back face down. Remember them!",
  },
];

export default function RulesPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <PageHeader
        icon={BookOpen}
        title="How to play"
        description="Memory, nerve and a little sabotage."
      />

      {/* Jump to a section. Sticks under the top edge on a phone. */}
      <nav
        aria-label="Sections"
        className="sticky top-[max(0.5rem,env(safe-area-inset-top,0px))] z-30 -mx-4 mb-5 px-4 md:static md:mx-0 md:px-0"
      >
        <ul className="flex gap-1.5 overflow-x-auto rounded-full border border-border p-1 shadow-card glass-chrome [scrollbar-width:none] md:flex-wrap md:justify-center md:overflow-visible">
          {SECTIONS.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                className="flex h-9 items-center rounded-full px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-4">
        <Section id="overview" icon={Target} title="Overview">
          <div className="grid gap-5 sm:grid-cols-2">
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1">
              {FACTS.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2.5 rounded-lg border border-border px-3 py-2.5 text-sm glass-control"
                >
                  <Icon className="size-4 shrink-0 text-primary" aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
            <div>
              <h3 className="mb-2.5 text-sm font-semibold">Key ideas</h3>
              <Bullets
                items={[
                  "Several rounds, scores add up",
                  "Remember what you have seen",
                  "Cards have points, some have effects",
                  "Effects only work from the deck",
                  "Swapping at the right time wins",
                ]}
              />
            </div>
          </div>
        </Section>

        <Section id="setup" icon={Settings} title="Setup">
          <ol className="space-y-4">
            {SETUP.map((step, index) => (
              <li key={step.title} className="flex items-start gap-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary-edge bg-primary font-display font-bold text-primary-foreground shadow-primary">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="play" icon={Gamepad2} title="How to play">
          <div className="space-y-3">
            <Callout tone="primary" icon={Gamepad2} title="On your turn">
              <Steps
                items={[
                  "Draw the top card from the deck.",
                  "Look at it: now you know what it is.",
                  <>
                    Then either <strong className="text-foreground">use its effect</strong>{" "}
                    (if it has one) and discard it, <strong className="text-foreground">or swap it</strong>{" "}
                    into your layout in place of one of your face-down cards.
                  </>,
                ]}
              />
            </Callout>

            <Callout tone="look" icon={Layers} title="Matching the deck card">
              <p className="mb-2">
                If the top deck card matches a layout card you remember, you
                may play it straight away.
              </p>
              <Bullets
                items={[
                  "Once you pick it up, you must play it.",
                  "If anyone saw the card you picked up, you keep it and make your move.",
                ]}
              />
            </Callout>

            <Callout tone="peek" icon={Hand} title="Snatching">
              <p className="mb-2">
                See a card played that matches one you know someone holds?
                Grab it and play it for them, right away.
              </p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-success" />
                  <span>
                    <strong className="text-foreground">Right:</strong> they
                    draw 2 extra cards.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-destructive" />
                  <span>
                    <strong className="text-foreground">Wrong:</strong> you
                    draw 2 extra cards.
                  </span>
                </li>
              </ul>
            </Callout>
          </div>
        </Section>

        <Section id="effects" icon={Sparkles} title="Card effects">
          <div className="space-y-3">
            <Callout
              tone="destructive"
              icon={AlertTriangle}
              title="Only straight from the deck"
            >
              An effect works only when you draw the card from the deck and
              play it at once. In your layout, a card is just its points.
            </Callout>
            <div className="grid gap-3 sm:grid-cols-3">
              <Callout tone="peek" icon={Eye} title="7 and 8 · Peek">
                Look at one of your own face-down cards.
              </Callout>
              <Callout tone="swap" icon={Shuffle} title="9 and 10 · Swap">
                Blindly swap one of your cards with an opponent’s.
              </Callout>
              <Callout tone="look" icon={Search} title="Jack · Look">
                Look at one of an opponent’s face-down cards.
              </Callout>
            </div>
          </div>
        </Section>

        <Section id="scoring" icon={BarChart3} title="Scoring">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="mb-2.5 text-sm font-semibold">Card values</h3>
              <dl className="divide-y divide-border overflow-hidden rounded-lg border border-border text-sm glass-control">
                {[
                  ["Ace", "1"],
                  ["2 – 10", "Face value"],
                  ["Jack", "11"],
                  ["Queen", "12"],
                  ["Joker", "0"],
                ].map(([card, value]) => (
                  <div key={card} className="flex justify-between px-3 py-2.5">
                    <dt>{card}</dt>
                    <dd className="font-medium tabular-nums">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="mb-2.5 text-sm font-semibold">Kings</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between rounded-lg border border-success/30 bg-success-surface px-3 py-2.5">
                  <dt>
                    <span className="text-suit-red">♥ ♦</span> Red King
                  </dt>
                  <dd className="font-display font-bold text-success">−1</dd>
                </div>
                <div className="flex justify-between rounded-lg border border-destructive/35 bg-destructive-surface px-3 py-2.5">
                  <dt>
                    <span className="text-muted-foreground">♠ ♣</span> Black King
                  </dt>
                  <dd className="font-display font-bold text-destructive">+13</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">
                Red Kings are your best friend. Black Kings are deadly.
              </p>
            </div>
          </div>
        </Section>

        <Section id="winning" icon={Flag} title="Round end and winning">
          <div className="space-y-3">
            <Callout tone="warning" icon={Flag} title="Calling “Jukas!”">
              <Steps
                items={[
                  "Call “Jukas!” when you think you have the lowest score.",
                  "Everyone reveals their cards and adds up their round score.",
                  "Add each round score to that player’s total.",
                  "Anyone on 100 or more is out.",
                  "Play new rounds until one player is left.",
                ]}
              />
            </Callout>
            <Callout tone="success" icon={Trophy} title="Winning">
              The <strong className="text-foreground">last player under 100
              points</strong> wins the game.
            </Callout>
          </div>
        </Section>

        <Section id="tips" icon={Lightbulb} title="Strategy tips">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="mb-2.5 text-sm font-semibold">Memory is key</h3>
              <Bullets
                items={[
                  "Remember your first 2 cards",
                  "Track what opponents have seen",
                  "Remember what was discarded",
                  "Note which cards were swapped",
                ]}
              />
            </div>
            <div>
              <h3 className="mb-2.5 text-sm font-semibold">Play smart</h3>
              <Bullets
                items={[
                  "Use 7s and 8s to check your cards",
                  "Red Kings are your best friends",
                  "Avoid Black Kings at all costs",
                  "Time your “Jukas!” carefully",
                ]}
              />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
