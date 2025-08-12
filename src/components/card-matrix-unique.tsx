export default function UniqueCardsTable() {
    const rows = [
        { name: "Ace", suits: "All suits", value: "1", effect: "No effect. Counts as 1 in front of you." },
        { name: "2–6", suits: "All suits", value: "Face value", effect: "No effect. Counts as shown." },
        {
            name: "7–8",
            suits: "All suits",
            value: "Face value",
            effect:
                "From the deck: look at one of your own face-down cards, then discard the 7/8. From the discard: no effect; you must swap it into your layout.",
        },
        {
            name: "9–10",
            suits: "All suits",
            value: "Face value",
            effect:
                "From the deck: blindly swap one of your face-down cards with one face-down card from an opponent (no looking), then discard the 9/10. From the discard: no effect; you must swap it into your layout.",
        },
        {
            name: "Jack",
            suits: "All suits",
            value: "11",
            effect:
                "From the deck: look at one opponent’s face-down card; you may swap that card with one of your own face-down cards, then discard the Jack. From the discard: no effect; you must swap it into your layout.",
        },
        { name: "Queen", suits: "All suits", value: "12", effect: "No effect. High value—try to ditch it." },
        { name: "Red King", suits: "♥ ♦", value: "-1", effect: "No effect. Counts as −1 in front of you." },
        { name: "Black King", suits: "♠ ♣", value: "+13", effect: "No effect. Counts as +13 in front of you." },
    ];

    return (
        <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm shadow-lg">
            {/* Mobile: card list */}
            <div className="md:hidden divide-y divide-white/10">
                {rows.map((r) => (
                    <article key={r.name} className="p-4">
                        <header className="flex items-start justify-between gap-3">
                            <h3 className="text-base font-semibold text-slate-100">{r.name}</h3>
                            <span className="shrink-0 rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-xs font-semibold text-slate-200">
                                {r.value}
                            </span>
                        </header>

                        <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                                {r.suits}
                            </span>
                            <span className="text-white/30">•</span>
                            <span>Value</span>
                        </div>

                        <details className="mt-2 group">
                            <summary className="cursor-pointer select-none text-sm text-slate-200/90 hover:text-white/95">
                                Effect (deck only)
                                <span className="ml-1 text-white/40 group-open:rotate-180 inline-block transition-transform">▾</span>
                            </summary>
                            <p className="mt-1 text-sm text-slate-400">{r.effect}</p>
                        </details>
                    </article>
                ))}
                <p className="px-4 py-3 text-xs text-white/60">
                    Effects happen only when you draw a card from the deck and play it to the discard. Taking from the discard never triggers effects; you just swap it into your layout.
                </p>
            </div>

            {/* Desktop/tablet: full table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-white/5 text-left">
                        <tr>
                            <th className="px-4 py-3 text-sm font-semibold border-b border-white/10 w-[22%]">Card</th>
                            <th className="px-4 py-3 text-sm font-semibold border-b border-white/10 w-[18%]">Suits</th>
                            <th className="px-4 py-3 text-sm font-semibold border-b border-white/10 w-[12%]">Value</th>
                            <th className="px-4 py-3 text-sm font-semibold border-b border-white/10">Effect (deck only)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={row.name} className={idx % 2 ? "bg-white/[.02]" : "bg-white/[.01]"}>
                                <td className="px-4 py-3 text-slate-200 font-medium border-b border-white/10">{row.name}</td>
                                <td className="px-4 py-3 text-slate-300 border-b border-white/10">
                                    {row.suits === "♥ ♦" ? <span className="text-red-300">♥ ♦</span> :
                                        row.suits === "♠ ♣" ? <span className="text-slate-300">♠ ♣</span> :
                                            row.suits}
                                </td>
                                <td className="px-4 py-3 text-slate-300 border-b border-white/10">{row.value}</td>
                                <td className="px-4 py-3 text-slate-400 border-b border-white/10">{row.effect}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={4} className="px-4 py-3 text-xs text-white/60 border-t border-white/10">
                                Effects only happen when a card is drawn from the deck and immediately played to the discard. Discard pickups never trigger effects.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
