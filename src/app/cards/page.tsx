import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UniqueCardsTable from "@/components/card-matrix-unique";

export default function CardsPage() {
  return (
    <div className="pb-24 md:pb-0">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 md:py-12">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>🃏</span>
            Card Reference
          </h1>
          <p className="text-sm text-muted-foreground">
            All card values and effects at a glance
          </p>
        </div>

        {/* Card Table */}
        <Card className="glass border-border/50 shadow-lg mb-6">
          <CardHeader className="border-b border-border/50 py-4">
            <CardTitle className="text-lg">Card Values & Effects</CardTitle>
            <CardDescription className="text-sm">
              Effects only work when drawn from deck and immediately used
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <UniqueCardsTable />
          </CardContent>
        </Card>

        {/* Quick Scoring Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card className="glass border-green-500/30 bg-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-400 flex items-center gap-2">
                <span>👑</span> Best Cards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-red-400">♥ ♦ Red Kings</span>
                <span className="font-bold text-green-400">-1 point</span>
              </div>
              <div className="flex justify-between">
                <span>Aces</span>
                <span className="font-bold text-green-400">1 point</span>
              </div>
              <div className="flex justify-between">
                <span>2s</span>
                <span className="font-bold text-green-400">2 points</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-red-500/30 bg-red-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-red-400 flex items-center gap-2">
                <span>💀</span> Worst Cards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">♠ ♣ Black Kings</span>
                <span className="font-bold text-red-400">+13 points</span>
              </div>
              <div className="flex justify-between">
                <span>Queens</span>
                <span className="font-bold text-red-400">12 points</span>
              </div>
              <div className="flex justify-between">
                <span>Jacks</span>
                <span className="font-bold text-red-400">11 points</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
