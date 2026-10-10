"use client";

import dynamic from "next/dynamic";

/**
 * The score keeper lives in localStorage, so it renders on the client only:
 * its first render already has the saved game, with no server pass that
 * would have to guess it and no flash of an empty setup screen.
 */
const ScoreKeeper = dynamic(() => import("@/components/scores/score-keeper"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="animate-pulse text-sm text-muted-foreground">
        Loading...
      </div>
    </div>
  ),
});

export default function ScoresPage() {
  return <ScoreKeeper />;
}
