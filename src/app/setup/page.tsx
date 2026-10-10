import { ArrowDown, ArrowRight, Brain, LayoutGrid, Target, Zap } from "lucide-react";
import { Callout } from "@/components/callout";
import { PageHeader } from "@/components/page-header";
import { PlayingCard } from "@/components/playing-card";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STEPS = [
  {
    title: "Deal 4 cards",
    description: "Each player gets 4 cards face down, in a 2×2 grid.",
  },
  {
    title: "Make the piles",
    description: "The rest is the draw pile. Flip its top card to start the discard pile.",
  },
  {
    title: "Peek at 2",
    description: "Each player looks at any 2 of their 4 cards, then puts them back.",
  },
];

function FaceDownGrid() {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-xl border border-border p-3 glass-control">
      {[0, 1, 2, 3].map((slot) => (
        <PlayingCard key={slot} faceDown size="sm" />
      ))}
    </div>
  );
}

function FlowStep({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <span className="text-center text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function FlowArrow() {
  return (
    <ArrowRight
      aria-hidden
      className="mb-6 size-4 shrink-0 text-muted-foreground"
    />
  );
}

export default function SetupPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <PageHeader
        icon={Zap}
        title="Quick setup"
        description="Get a game going in under a minute."
      />

      <Tabs defaultValue="setup" className="gap-4">
        <TabsList className="w-full">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="turn">A turn</TabsTrigger>
        </TabsList>

        <TabsContent value="setup">
          <Card>
            <CardContent className="space-y-6">
              <ol className="grid gap-5 sm:grid-cols-3">
                {STEPS.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex items-start gap-4 sm:flex-col sm:items-center sm:text-center"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary-edge bg-primary font-display text-lg font-bold text-primary-foreground shadow-primary sm:size-14 sm:text-2xl">
                      {index + 1}
                    </span>
                    <div>
                      <h2 className="font-display font-semibold sm:text-lg">
                        {step.title}
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <Callout tone="warning" icon={Brain} title="Remember your cards">
                The whole game turns on remembering the two cards you peeked
                at. That memory guides every move you make.
              </Callout>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout">
          <Card>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 items-start gap-6 sm:grid-cols-3">
                <figure className="flex flex-col items-center gap-3">
                  <figcaption className="text-sm font-semibold">
                    Your cards
                  </figcaption>
                  <FaceDownGrid />
                </figure>

                <figure className="order-last col-span-2 flex flex-col items-center gap-3 sm:order-none sm:col-span-1">
                  <figcaption className="text-sm font-semibold">
                    The piles
                  </figcaption>
                  <div className="flex items-center gap-4 sm:flex-col sm:gap-2">
                    <div className="flex flex-col items-center gap-1.5">
                      <PlayingCard faceDown />
                      <span className="text-xs text-muted-foreground">Draw</span>
                    </div>
                    <ArrowDown
                      aria-hidden
                      className="size-4 -rotate-90 text-muted-foreground sm:rotate-0"
                    />
                    <div className="flex flex-col items-center gap-1.5">
                      <PlayingCard rank="K" suit="hearts" />
                      <span className="text-xs text-muted-foreground">
                        Discard, face up
                      </span>
                    </div>
                  </div>
                </figure>

                <figure className="flex flex-col items-center gap-3">
                  <figcaption className="text-sm font-semibold">
                    Opponent
                  </figcaption>
                  <FaceDownGrid />
                </figure>
              </div>

              <Callout tone="success" icon={LayoutGrid} title="Keep your grid">
                Keep your four cards in the same 2×2 pattern all game. It helps
                you remember them and stops mix-ups.
              </Callout>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="turn">
          <Card>
            <CardContent className="space-y-4">
              <section className="rounded-xl border border-border p-4 glass-control sm:p-5">
                <h2 className="mb-4 font-display font-semibold">
                  Option A · Draw from the deck
                </h2>
                <div className="flex items-start justify-center gap-3 sm:gap-5">
                  <FlowStep label="1. Draw">
                    <PlayingCard faceDown />
                  </FlowStep>
                  <FlowArrow />
                  <FlowStep label="2. Look & use">
                    <PlayingCard rank="7" suit="hearts" />
                  </FlowStep>
                  <FlowArrow />
                  <FlowStep label="3. Discard">
                    <PlayingCard rank="7" suit="hearts" dimmed />
                  </FlowStep>
                </div>
              </section>

              <section className="rounded-xl border border-border p-4 glass-control sm:p-5">
                <h2 className="mb-4 font-display font-semibold">
                  Option B · Take the discard
                </h2>
                <div className="flex items-start justify-center gap-3 sm:gap-5">
                  <FlowStep label="1. Take it">
                    <PlayingCard rank="K" suit="hearts" />
                  </FlowStep>
                  <FlowArrow />
                  <FlowStep label="2. Swap">
                    <PlayingCard faceDown />
                  </FlowStep>
                  <FlowArrow />
                  <FlowStep label="3. Discard">
                    <PlayingCard rank="Q" suit="spades" dimmed />
                  </FlowStep>
                </div>
              </section>

              <Callout tone="primary" icon={Target} title="Strategy tip">
                Taking a red King (−1 point) from the discard pile usually
                beats drawing blind, above all when you can swap it for a high
                card you remember.
              </Callout>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
