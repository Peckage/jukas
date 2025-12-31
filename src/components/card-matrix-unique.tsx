"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const cardData = [
  {
    name: "Ace",
    suits: "All suits",
    value: "1",
    valueType: "low",
    effect: "No effect. Counts as 1 in front of you.",
    hasEffect: false,
  },
  {
    name: "2–6",
    suits: "All suits",
    value: "Face value",
    valueType: "normal",
    effect: "No effect. Counts as shown.",
    hasEffect: false,
  },
  {
    name: "7–8",
    suits: "All suits",
    value: "Face value",
    valueType: "normal",
    effect:
      "Effect ONLY when drawn from deck: look at one of your own face-down cards. You may discard the 7/8 (effect used) OR swap it into your layout (becomes just point value).",
    hasEffect: true,
    effectColor: "purple",
  },
  {
    name: "9–10",
    suits: "All suits",
    value: "Face value",
    valueType: "normal",
    effect:
      "Effect ONLY when drawn from deck: blindly swap one of your face-down cards with an opponent's face-down card, then discard the 9/10. If swapped into layout, just point value.",
    hasEffect: true,
    effectColor: "orange",
  },
  {
    name: "Jack",
    suits: "All suits",
    value: "11",
    valueType: "high",
    effect:
      "Effect ONLY when drawn from deck: look at one opponent's face-down card; you may discard the Jack (effect used) OR swap it into your layout (becomes just point value).",
    hasEffect: true,
    effectColor: "cyan",
  },
  {
    name: "Queen",
    suits: "All suits",
    value: "12",
    valueType: "high",
    effect: "No effect. High value - try to ditch it.",
    hasEffect: false,
  },
  {
    name: "Red King",
    suits: "♥ ♦",
    value: "-1",
    valueType: "bonus",
    effect: "No effect. Counts as -1 in front of you. The best card!",
    hasEffect: false,
  },
  {
    name: "Black King",
    suits: "♠ ♣",
    value: "+13",
    valueType: "danger",
    effect: "No effect. Counts as +13 in front of you. Avoid at all costs!",
    hasEffect: false,
  },
];

function getValueBadgeStyle(type: string) {
  switch (type) {
    case "low":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    case "normal":
      return "bg-muted text-muted-foreground border-border";
    case "high":
      return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    case "bonus":
      return "bg-green-500/20 text-green-300 border-green-500/30";
    case "danger":
      return "bg-red-500/20 text-red-300 border-red-500/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

function getSuitDisplay(suits: string) {
  if (suits === "♥ ♦") {
    return <span className="text-red-400 font-medium">♥ ♦</span>;
  }
  if (suits === "♠ ♣") {
    return <span className="text-muted-foreground font-medium">♠ ♣</span>;
  }
  return <span className="text-muted-foreground">{suits}</span>;
}

export default function UniqueCardsTable() {
  return (
    <div className="w-full">
      {/* Mobile: Accordion View */}
      <div className="lg:hidden">
        <Accordion type="single" collapsible className="w-full">
          {cardData.map((card, index) => (
            <AccordionItem
              key={card.name}
              value={card.name}
              className={index === 0 ? "border-t-0" : ""}
            >
              <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/30">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">
                      {card.name}
                    </span>
                    {card.hasEffect && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-primary/10 border-primary/30 text-primary"
                      >
                        Effect
                      </Badge>
                    )}
                  </div>
                  <Badge
                    className={`${getValueBadgeStyle(
                      card.valueType
                    )} font-bold`}
                  >
                    {card.value}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <Card className="bg-muted/30 border-border/50">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Suits:
                      </span>
                      <span className="text-lg">
                        {getSuitDisplay(card.suits)}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">
                        Effect:
                      </span>
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        {card.effect}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Critical Note */}
        <div className="m-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-semibold text-amber-300 mb-1">Important</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Card effects only work when drawn from deck and immediately
                discarded. Cards in your layout are just point values—no
                effects!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Table View */}
      <div className="hidden lg:block">
        <div className="rounded-xl border border-border/50 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Card
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Suits
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Value
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Effect (deck only)
                </th>
              </tr>
            </thead>
            <tbody>
              {cardData.map((card, index) => (
                <tr
                  key={card.name}
                  className={`border-b border-border/30 transition-colors hover:bg-muted/20 ${
                    index % 2 === 0 ? "bg-transparent" : "bg-muted/10"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {card.name}
                      </span>
                      {card.hasEffect && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-primary/10 border-primary/30 text-primary"
                        >
                          Effect
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-lg">
                    {getSuitDisplay(card.suits)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={`${getValueBadgeStyle(
                        card.valueType
                      )} font-bold`}
                    >
                      {card.value}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground max-w-md">
                    {card.effect}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gradient-to-r from-amber-500/10 to-orange-500/10">
                <td colSpan={4} className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">⚠️</span>
                    <span className="text-sm">
                      <span className="font-semibold text-amber-300">
                        CRITICAL:
                      </span>
                      <span className="text-muted-foreground ml-1">
                        Effects only work when drawn from deck and immediately
                        discarded. Cards in your layout are just point values—no
                        effects!
                      </span>
                    </span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
