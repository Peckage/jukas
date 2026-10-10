import type { LucideIcon } from "lucide-react";
import { Crown, Eye, Heart, Search, Shuffle, Skull } from "lucide-react";
import { FlipCard, PlayingCard } from "@/components/playing-card";
import { TONE, type Tone } from "@/components/tone";
import { cn } from "@/lib/utils";

/**
 * The walkthrough's scenes: one small animated table per step. Each one
 * plays when it mounts; delays are in seconds and stagger the motion so
 * the eye follows one thing at a time.
 */

function delay(seconds: number) {
  return { animationDelay: `${seconds}s` };
}

function Label({
  children,
  at,
  tone,
  icon: Icon,
}: {
  children: React.ReactNode;
  /** Seconds before it pops in. */
  at: number;
  tone?: Tone;
  icon?: LucideIcon;
}) {
  return (
    <span
      className={cn(
        "animate-pop-in inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold whitespace-nowrap",
        tone
          ? [TONE[tone].surface, TONE[tone].text]
          : "border-border text-foreground glass-control"
      )}
      style={delay(at)}
    >
      {Icon && <Icon className="size-3.5" aria-hidden />}
      {children}
    </span>
  );
}

function LivesRow({
  name,
  from = 100,
  to,
  at = 0,
  crown,
}: {
  name: string;
  from?: number;
  to: number;
  at?: number;
  crown?: boolean;
}) {
  const out = to <= 0;
  return (
    <div className="animate-slide-up flex items-center gap-3" style={delay(at)}>
      <span className="flex w-16 items-center gap-1 truncate text-sm font-medium">
        {name}
        {crown && <Crown className="size-3.5 shrink-0 text-warning" aria-label="Winner" />}
      </span>
      <span className="h-2 flex-1 overflow-hidden rounded-full bg-foreground/10">
        <span
          className={cn(
            "animate-drain block h-full rounded-full",
            out ? "bg-destructive" : to < 30 ? "bg-warning" : "bg-primary"
          )}
          style={
            {
              "--from": `${from}%`,
              "--to": `${Math.max(0, to)}%`,
              ...delay(at + 0.3),
            } as React.CSSProperties
          }
        />
      </span>
      <span
        className={cn(
          "flex w-14 items-center justify-end gap-1 text-sm font-semibold tabular-nums",
          out && "text-destructive"
        )}
      >
        {out ? (
          <>
            <Skull className="size-3.5" aria-hidden />
            Out
          </>
        ) : (
          <>
            {to}
            <Heart className="size-3.5 fill-current text-suit-red" aria-hidden />
          </>
        )}
      </span>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
}

export function StartScene() {
  return (
    <div className="w-full max-w-xs space-y-3.5">
      <LivesRow name="Anna" from={0} to={100} at={0} />
      <LivesRow name="Bram" from={0} to={100} at={0.15} />
      <LivesRow name="Chris" from={0} to={100} at={0.3} />
    </div>
  );
}

export function DealScene() {
  return (
    <div className="flex items-center gap-5 sm:gap-8">
      <div className="relative">
        <PlayingCard faceDown size="sm" className="absolute -top-1 -left-1 opacity-60" />
        <PlayingCard faceDown size="sm" />
        <span className="mt-1.5 block text-center text-2xs text-muted-foreground">
          Draw
        </span>
      </div>
      <Grid>
        {[0, 1, 2, 3].map((slot) => (
          <div key={slot} className="animate-deal" style={delay(0.15 + slot * 0.18)}>
            <PlayingCard faceDown />
          </div>
        ))}
      </Grid>
      <div className="animate-pop-in" style={delay(1.05)}>
        <PlayingCard rank="5" suit="clubs" size="sm" />
        <span className="mt-1.5 block text-center text-2xs text-muted-foreground">
          Discard
        </span>
      </div>
    </div>
  );
}

export function PeekScene() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Grid>
        <FlipCard rank="3" suit="clubs" animation="animate-peek" />
        <PlayingCard faceDown />
        <PlayingCard faceDown />
        <FlipCard rank="K" suit="hearts" animation="animate-peek" />
      </Grid>
      <Label at={0.6} tone="primary" icon={Eye}>
        Remember these two
      </Label>
    </div>
  );
}

export function DrawScene() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-4">
        <div className="relative z-10">
          <PlayingCard faceDown className="absolute -top-1 -left-1 opacity-60" />
          <PlayingCard faceDown />
        </div>
        <div className="animate-draw-out">
          <FlipCard rank="9" suit="spades" animation="animate-flip-up" delay={0.6} />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Label at={1.2}>Swap it in</Label>
        <Label at={1.35}>Or play its power</Label>
      </div>
    </div>
  );
}

export function SwapScene() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-6">
        <Grid>
          <PlayingCard faceDown />
          {/* The slot being swapped: the old card leaves, the new one lands. */}
          <div className="relative">
            <PlayingCard rank="Q" suit="spades" className="animate-discard-away" />
            <PlayingCard
              rank="2"
              suit="diamonds"
              className="animate-drop-in absolute inset-0 ring-2 ring-primary"
            />
          </div>
          <PlayingCard faceDown />
          <PlayingCard faceDown />
        </Grid>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Label at={1.1} tone="destructive">Q out · costs 12</Label>
        <Label at={1.3} tone="success">2 in · costs 2</Label>
      </div>
    </div>
  );
}

const POWERS: {
  rank: string;
  suit: "hearts" | "clubs" | "diamonds";
  label: string;
  text: string;
  icon: LucideIcon;
  tone: Tone;
}[] = [
  { rank: "7", suit: "hearts", label: "Peek", text: "one of yours", icon: Eye, tone: "peek" },
  { rank: "9", suit: "clubs", label: "Swap", text: "blind, with anyone", icon: Shuffle, tone: "swap" },
  { rank: "J", suit: "diamonds", label: "Look", text: "at someone else’s", icon: Search, tone: "look" },
];

export function PowersScene() {
  return (
    <div className="grid w-full max-w-sm grid-cols-3 gap-3">
      {POWERS.map((power, index) => (
        <div
          key={power.label}
          className="animate-slide-up flex flex-col items-center gap-2 text-center"
          style={delay(0.15 + index * 0.2)}
        >
          <PlayingCard rank={power.rank} suit={power.suit} />
          <span
            className={cn(
              "inline-flex h-6 items-center gap-1 rounded-full border px-2 text-2xs font-semibold",
              TONE[power.tone].surface,
              TONE[power.tone].text
            )}
          >
            <power.icon className="size-3" aria-hidden />
            {power.label}
          </span>
          <span className="text-2xs leading-tight text-muted-foreground">
            {power.text}
          </span>
        </div>
      ))}
    </div>
  );
}

export function SnatchScene() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative mr-8">
        <PlayingCard rank="6" suit="spades" className="-rotate-6" />
        <PlayingCard
          rank="6"
          suit="hearts"
          className="animate-slap absolute top-2 left-8 rotate-6"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Label at={0.8} tone="success">Right · they draw 2</Label>
        <Label at={1.0} tone="destructive">Wrong · you draw 2</Label>
      </div>
    </div>
  );
}

const REVEAL: { rank: string; suit: "spades" | "clubs" | "hearts" | "diamonds"; cost: string }[] = [
  { rank: "A", suit: "spades", cost: "−1" },
  { rank: "3", suit: "clubs", cost: "−3" },
  { rank: "K", suit: "hearts", cost: "+1" },
  { rank: "5", suit: "diamonds", cost: "−5" },
];

export function JukasScene() {
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-3">
      <div className="flex gap-2">
        {REVEAL.map((card, index) => (
          <div key={card.rank + card.suit} className="flex flex-col items-center gap-1.5">
            <FlipCard
              rank={card.rank}
              suit={card.suit}
              animation="animate-flip-up"
              delay={0.2 + index * 0.25}
            />
            <span
              className={cn(
                "animate-pop-in text-xs font-semibold tabular-nums",
                card.cost.startsWith("+") ? "text-success" : "text-muted-foreground"
              )}
              style={delay(0.6 + index * 0.25)}
            >
              {card.cost}
            </span>
          </div>
        ))}
      </div>
      <Label at={1.4} tone="destructive">
        1 + 3 − 1 + 5 = 8 lives lost
      </Label>
      <div className="w-full">
        <LivesRow name="Anna" to={92} at={1.8} />
      </div>
    </div>
  );
}

export function WinScene() {
  return (
    <div className="w-full max-w-xs space-y-3.5">
      <LivesRow name="Anna" to={15} at={0} crown />
      <LivesRow name="Bram" to={0} at={0.2} />
      <LivesRow name="Chris" to={0} at={0.4} />
    </div>
  );
}
