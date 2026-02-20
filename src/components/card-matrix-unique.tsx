"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, Eye, Shuffle, Search, Sparkles } from "lucide-react";

const cardData = [
  {
    name: "Ace",
    suits: "All suits",
    value: "1",
    valueType: "low",
    effect: "No effect. Counts as 1 in front of you.",
    hasEffect: false,
    icon: null,
  },
  {
    name: "2–6",
    suits: "All suits",
    value: "Face value",
    valueType: "normal",
    effect: "No effect. Counts as shown.",
    hasEffect: false,
    icon: null,
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
    icon: Eye,
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
    icon: Shuffle,
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
    icon: Search,
  },
  {
    name: "Queen",
    suits: "All suits",
    value: "12",
    valueType: "high",
    effect: "No effect. High value - try to ditch it.",
    hasEffect: false,
    icon: null,
  },
  {
    name: "Red King",
    suits: "♥ ♦",
    value: "-1",
    valueType: "bonus",
    effect: "No effect. Counts as -1 in front of you. The best card!",
    hasEffect: false,
    icon: Sparkles,
  },
  {
    name: "Black King",
    suits: "♠ ♣",
    value: "+13",
    valueType: "danger",
    effect: "No effect. Counts as +13 in front of you. Avoid at all costs!",
    hasEffect: false,
    icon: AlertTriangle,
  },
  {
    name: "Joker",
    suits: "🃏",
    value: "0",
    valueType: "bonus",
    effect:
      "No effect. Worth 0 points - great for bluffing! Opponents think you have cards, but it doesn't hurt your score.",
    hasEffect: false,
    icon: null,
  },
];

function getValueBadgeStyle(type: string) {
  switch (type) {
    case "low":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
    case "normal":
      return "bg-muted/80 text-muted-foreground border-border/30";
    case "high":
      return "bg-amber-500/15 text-amber-400 border-amber-500/20";
    case "bonus":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
    case "danger":
      return "bg-red-500/15 text-red-400 border-red-500/20";
    default:
      return "bg-muted/80 text-muted-foreground border-border/30";
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

function getEffectBadgeColor(color?: string) {
  switch (color) {
    case "purple":
      return "bg-purple-500/15 border-purple-500/20 text-purple-400";
    case "orange":
      return "bg-orange-500/15 border-orange-500/20 text-orange-400";
    case "cyan":
      return "bg-cyan-500/15 border-cyan-500/20 text-cyan-400";
    default:
      return "bg-primary/15 border-primary/20 text-primary";
  }
}

export default function UniqueCardsTable() {
  return (
    <div className="w-full">
      {/* Mobile: Card-style Accordion View */}
      <div className="lg:hidden">
        <Accordion type="single" collapsible className="w-full">
          {cardData.map((card, index) => (
            <AccordionItem
              key={card.name}
              value={card.name}
              className={index === 0 ? "border-t-0" : "border-border/20"}
            >
              <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-muted/20">
                <div className="flex items-center justify-between w-full pr-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-semibold text-foreground text-sm">
                      {card.name}
                    </span>
                    {card.hasEffect && (
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 h-5 ${getEffectBadgeColor(
                          card.effectColor
                        )}`}
                      >
                        Effect
                      </Badge>
                    )}
                  </div>
                  <Badge
                    className={`${getValueBadgeStyle(
                      card.valueType
                    )} font-bold text-xs`}
                  >
                    {card.value}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <Card className="bg-muted/20 border-border/20">
                  <CardContent className="p-3.5 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Suits:
                      </span>
                      <span className="text-base">
                        {getSuitDisplay(card.suits)}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">
                        Details:
                      </span>
                      <p className="text-sm text-foreground/85 leading-relaxed">
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
        <div className="m-4 p-3.5 rounded-xl bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-amber-400 text-xs mb-0.5">
                Important
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Card effects only work when drawn from deck and immediately
                discarded. Cards in your layout are just point values!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Table View */}
      <div className="hidden lg:block">
        <div className="rounded-xl border border-border/30 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/40 border-b border-border/30">
                <th className="px-5 py-3.5 text-left text-sm font-semibold text-foreground">
                  Card
                </th>
                <th className="px-5 py-3.5 text-left text-sm font-semibold text-foreground">
                  Suits
                </th>
                <th className="px-5 py-3.5 text-left text-sm font-semibold text-foreground">
                  Value
                </th>
                <th className="px-5 py-3.5 text-left text-sm font-semibold text-foreground">
                  Effect (deck only)
                </th>
              </tr>
            </thead>
            <tbody>
              {cardData.map((card, index) => (
                <tr
                  key={card.name}
                  className={`border-b border-border/20 transition-colors hover:bg-muted/15 ${
                    index % 2 === 0 ? "bg-transparent" : "bg-muted/5"
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground text-sm">
                        {card.name}
                      </span>
                      {card.hasEffect && (
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 h-5 ${getEffectBadgeColor(
                            card.effectColor
                          )}`}
                        >
                          Effect
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-base">
                    {getSuitDisplay(card.suits)}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge
                      className={`${getValueBadgeStyle(
                        card.valueType
                      )} font-bold text-xs`}
                    >
                      {card.value}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground max-w-md leading-relaxed">
                    {card.effect}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-linear-to-r from-amber-500/8 to-orange-500/8">
                <td colSpan={4} className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-sm">
                      <span className="font-semibold text-amber-400">
                        CRITICAL:
                      </span>
                      <span className="text-muted-foreground ml-1">
                        Effects only work when drawn from deck and immediately
                        discarded. Cards in your layout are just point values!
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
