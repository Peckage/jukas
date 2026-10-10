import { cn } from "@/lib/utils";

export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

const SUIT_GLYPH: Record<Suit, string> = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

const SIZE = {
  sm: "h-14 w-10 rounded-md text-sm",
  md: "h-[4.25rem] w-12 rounded-lg text-base sm:h-20 sm:w-14",
} as const;

type PlayingCardProps = {
  size?: keyof typeof SIZE;
  className?: string;
} & (
  | { faceDown: true; rank?: never; suit?: never; dimmed?: never }
  | { faceDown?: false; rank: string; suit: Suit; dimmed?: boolean }
);

/**
 * A playing card in the setup and turn diagrams: face down (the blue back)
 * or face up on paper, optionally dimmed for a card that went to the
 * discard pile.
 */
export function PlayingCard(props: PlayingCardProps) {
  const { size = "md", className } = props;

  if (props.faceDown) {
    return (
      <div
        role="img"
        aria-label="Face-down card"
        className={cn(
          "card-back flex shrink-0 items-center justify-center border border-primary/50 shadow-card",
          SIZE[size],
          className
        )}
      >
        <span className="rounded-full border border-primary/40 bg-card/70 px-1.5 font-display text-xs font-bold text-primary">
          J
        </span>
      </div>
    );
  }

  const red = props.suit === "hearts" || props.suit === "diamonds";
  return (
    <div
      role="img"
      aria-label={`${props.rank} of ${props.suit}`}
      className={cn(
        "flex shrink-0 flex-col items-center justify-center border border-black/10 bg-paper font-display leading-none font-bold shadow-card",
        red ? "text-paper-red" : "text-paper-ink",
        props.dimmed && "opacity-55 saturate-50",
        SIZE[size],
        className
      )}
    >
      <span>{props.rank}</span>
      <span className="mt-0.5">{SUIT_GLYPH[props.suit]}</span>
    </div>
  );
}
