import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, TrendingDown, TrendingUp } from "lucide-react";
import UniqueCardsTable from "@/components/card-matrix-unique";

export default function CardsPage() {
  return (
    <div className="pb-24 md:pb-0">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 py-8 md:py-12">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/15 mb-4">
            <Layers className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Card Reference
          </h1>
          <p className="text-sm text-muted-foreground">
            All card values and effects at a glance
          </p>
        </div>

        {/* Quick Scoring Summary */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="glass border-emerald-500/20">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm text-emerald-400 flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4" />
                Best Cards
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-red-400">♥ ♦ K</span>
                <span className="font-bold text-emerald-400">-1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ace</span>
                <span className="font-semibold text-emerald-400">1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">2s</span>
                <span className="font-semibold text-emerald-400">2</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-red-500/20">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm text-red-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                Worst Cards
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">♠ ♣ K</span>
                <span className="font-bold text-red-400">+13</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Queen</span>
                <span className="font-semibold text-red-400">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Jack</span>
                <span className="font-semibold text-red-400">11</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Card Table */}
        <Card className="glass border-border/30 shadow-xl">
          <CardHeader className="border-b border-border/30 py-4 px-5">
            <CardTitle className="text-base">Card Values & Effects</CardTitle>
            <CardDescription className="text-xs">
              Effects only work when drawn from deck and immediately used
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-5">
            <UniqueCardsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
