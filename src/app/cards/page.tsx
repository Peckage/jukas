import { AlertTriangle, Layers, TrendingDown, TrendingUp } from "lucide-react";
import { CardList } from "@/components/card-list";
import { Callout } from "@/components/callout";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const BEST = [
  { card: "Red King", suits: "♥ ♦", value: "+1" },
  { card: "Joker", value: "0" },
  { card: "Ace", value: "−1" },
];

const WORST = [
  { card: "Black King", suits: "♠ ♣", value: "−13" },
  { card: "Queen", value: "−12" },
  { card: "Jack", value: "−11" },
];

function Extremes({
  title,
  icon: Icon,
  rows,
  good,
}: {
  title: string;
  icon: typeof TrendingDown;
  rows: { card: string; suits?: string; value: string }[];
  good: boolean;
}) {
  const tone = good ? "text-success" : "text-destructive";
  return (
    <Card className="gap-3 py-4">
      <CardHeader className="px-4">
        <CardTitle className={cn("flex items-center gap-1.5 text-sm", tone)}>
          <Icon className="size-4" aria-hidden />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <dl className="space-y-1.5 text-sm">
          {rows.map((row) => (
            <div key={row.card} className="flex items-baseline justify-between gap-2">
              <dt className="truncate text-muted-foreground">
                {row.card}
                {row.suits && (
                  <span
                    className={cn(
                      "ml-1.5 hidden text-xs min-[400px]:inline",
                      good && "text-suit-red"
                    )}
                  >
                    {row.suits}
                  </span>
                )}
              </dt>
              <dd className={cn("font-display font-bold tabular-nums", tone)}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

export default function CardsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <PageHeader
        icon={Layers}
        title="Card reference"
        description="What every card costs, and what it does."
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:gap-4">
        <Extremes title="Best cards" icon={TrendingUp} rows={BEST} good />
        <Extremes title="Worst cards" icon={TrendingDown} rows={WORST} good={false} />
      </div>

      <Callout
        tone="warning"
        icon={AlertTriangle}
        title="Powers only work from the deck"
        className="mb-4"
      >
        A card’s power works only when you draw it from the deck and play it
        straight away. In your grid, a card only costs its lives.
      </Callout>

      <Card className="gap-0 py-0">
        <CardHeader className="border-b border-border py-4 [.border-b]:pb-4">
          <CardTitle>Lives and powers</CardTitle>
          <CardDescription>
            What each card costs when the round ends. Suits only matter for
            Kings.
          </CardDescription>
        </CardHeader>
        <CardList />
      </Card>
    </div>
  );
}
