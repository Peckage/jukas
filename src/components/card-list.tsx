import type { LucideIcon } from "lucide-react";
import { Eye, Search, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TONE, type Tone } from "@/components/tone";

type Effect = { label: string; icon: LucideIcon; tone: Tone };

const PEEK: Effect = { label: "Peek", icon: Eye, tone: "peek" };
const SWAP: Effect = { label: "Swap", icon: Shuffle, tone: "swap" };
const LOOK: Effect = { label: "Look", icon: Search, tone: "look" };

/** How a card's value reads: good for you, neutral, costly, or deadly. */
type Verdict = "good" | "neutral" | "high" | "deadly";

const VERDICT: Record<Verdict, string> = {
  good: TONE.success.surface + " " + TONE.success.text,
  neutral: "border-border glass-control text-foreground",
  high: TONE.warning.surface + " " + TONE.warning.text,
  deadly: TONE.destructive.surface + " " + TONE.destructive.text,
};

const CARDS: {
  name: string;
  face: string;
  red?: boolean;
  suits: string;
  value: string;
  verdict: Verdict;
  effect?: Effect;
  text: string;
}[] = [
  {
    name: "Ace",
    face: "A",
    suits: "All suits",
    value: "1",
    verdict: "good",
    text: "No effect. Counts as 1 in front of you.",
  },
  {
    name: "2 – 6",
    face: "2–6",
    suits: "All suits",
    value: "Face",
    verdict: "neutral",
    text: "No effect. Counts as shown.",
  },
  {
    name: "7 – 8",
    face: "7·8",
    suits: "All suits",
    value: "Face",
    verdict: "neutral",
    effect: PEEK,
    text: "Look at one of your own face-down cards. Then discard the 7 or 8 (effect used) or swap it into your layout, where it only counts its points.",
  },
  {
    name: "9 – 10",
    face: "9·10",
    suits: "All suits",
    value: "Face",
    verdict: "neutral",
    effect: SWAP,
    text: "Blindly swap one of your face-down cards with an opponent’s, then discard the 9 or 10. Swapped into your layout, it only counts its points.",
  },
  {
    name: "Jack",
    face: "J",
    suits: "All suits",
    value: "11",
    verdict: "high",
    effect: LOOK,
    text: "Look at one opponent’s face-down card. Then discard the Jack (effect used) or swap it into your layout, where it only counts its points.",
  },
  {
    name: "Queen",
    face: "Q",
    suits: "All suits",
    value: "12",
    verdict: "high",
    text: "No effect. Expensive: get rid of it.",
  },
  {
    name: "Red King",
    face: "K",
    red: true,
    suits: "♥ ♦",
    value: "−1",
    verdict: "good",
    text: "No effect. Counts as −1 in front of you. The best card in the deck.",
  },
  {
    name: "Black King",
    face: "K",
    suits: "♠ ♣",
    value: "+13",
    verdict: "deadly",
    text: "No effect. Counts as +13 in front of you. Avoid it at all costs.",
  },
  {
    name: "Joker",
    face: "🃏",
    suits: "Jokers",
    value: "0",
    verdict: "good",
    text: "No effect. Worth nothing, so it is perfect for bluffing: opponents think you hold points.",
  },
];

/**
 * Every card, its value and what it does. One list for every screen: on a
 * phone it is the full reference without a tap, on a desktop the same rows
 * read like a table.
 */
export function CardList() {
  return (
    <ul className="divide-y divide-border">
      {CARDS.map((card) => (
        <li key={card.name} className="flex items-start gap-3.5 px-4 py-4 sm:gap-4 sm:px-5">
          <span
            aria-hidden
            className={cn(
              "flex h-12 w-9 shrink-0 items-center justify-center rounded-md border border-black/10 bg-paper font-display leading-none font-bold tracking-tight shadow-control",
              // A range of ranks ("9·10") needs the smaller size to fit.
              card.face.length > 2 ? "text-3xs" : "text-sm",
              card.red ? "text-paper-red" : "text-paper-ink"
            )}
          >
            {card.face}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="font-display font-semibold">{card.name}</h3>
              <span
                className={cn(
                  "text-xs",
                  card.red ? "text-suit-red" : "text-muted-foreground"
                )}
              >
                {card.suits}
              </span>
              {card.effect && (
                <span
                  className={cn(
                    "inline-flex h-5 items-center gap-1 rounded-full border px-2 text-2xs font-semibold",
                    TONE[card.effect.tone].surface,
                    TONE[card.effect.tone].text
                  )}
                >
                  <card.effect.icon className="size-3" aria-hidden />
                  {card.effect.label}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {card.text}
            </p>
          </div>

          <span
            className={cn(
              "flex h-8 min-w-12 shrink-0 items-center justify-center rounded-md border px-2 font-display text-sm font-bold tabular-nums",
              VERDICT[card.verdict]
            )}
          >
            {card.value}
          </span>
        </li>
      ))}
    </ul>
  );
}
