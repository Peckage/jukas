export default function UniqueCardsTable() {
    const rows = [
        { name: "Ace", suits: "All suits", value: "1", effect: "No effect. Counts as 1 in front of you." },
        { name: "2–6", suits: "All suits", value: "Face value", effect: "No effect. Counts as shown." },
        {
            name: "7–8",
            suits: "All suits",
            value: "Face value",
            effect:
                "Effect ONLY when drawn from deck: look at one of your own face-down cards. You may discard the 7/8 (effect used) OR swap it into your layout (becomes just point value).",
        },
        {
            name: "9–10",
            suits: "All suits",
            value: "Face value",
            effect:
                "Effect ONLY when drawn from deck: blindly swap one of your face-down cards with an opponent's face-down card, then discard the 9/10. If swapped into layout, just point value.",
        },
        {
            name: "Jack",
            suits: "All suits",
            value: "11",
            effect:
                "Effect ONLY when drawn from deck: look at one opponent's face-down card; you may discard the Jack (effect used) OR swap it into your layout (becomes just point value).",
        },
        { name: "Queen", suits: "All suits", value: "12", effect: "No effect. High value - try to ditch it." },
        { name: "Red King", suits: "♥ ♦", value: "-1", effect: "No effect. Counts as -1 in front of you." },
        { name: "Black King", suits: "♠ ♣", value: "+13", effect: "No effect. Counts as +13 in front of you." },
    ];

    return (
        <div className="rounded-xl border border-slate-600/50 bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm shadow-lg">
            {/* Mobile: card list */}
            <div className="lg:hidden divide-y divide-slate-600/50">
                {rows.map((r) => (
                    <article key={r.name} className="p-5">
                        <header className="flex items-center justify-between gap-3 mb-3">
                            <h3 className="text-lg font-bold text-slate-100">{r.name}</h3>
                            <span className="shrink-0 rounded-md border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 text-sm font-bold text-emerald-300">
                                {r.value}
                            </span>
                        </header>

                        <div className="flex items-center gap-3 text-sm text-slate-400 mb-3">
                            <span className="rounded-full border border-slate-600/50 bg-slate-700/50 px-3 py-1 text-xs">
                                {r.suits}
                            </span>
                            {r.suits === "♥ ♦" && <span className="text-red-400 text-lg">♥ ♦</span>}
                            {r.suits === "♠ ♣" && <span className="text-slate-300 text-lg">♠ ♣</span>}
                        </div>

                        <details className="group">
                            <summary className="cursor-pointer select-none text-base text-slate-200/90 hover:text-white/95 font-medium py-2">
                                Card Effect
                                <span className="ml-2 text-white/40 group-open:rotate-180 inline-block transition-transform">▾</span>
                            </summary>
                            <div className="mt-2 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                                <p className="text-sm text-slate-300 leading-relaxed">{r.effect}</p>
                            </div>
                        </details>
                    </article>
                ))}
                <div className="px-5 py-4 text-sm text-slate-300 bg-gradient-to-r from-amber-800/20 to-orange-800/20 border-t border-amber-600/50">
                    <p className="leading-relaxed">
                        <strong className="text-amber-300">CRITICAL:</strong> Card effects only work when drawn from the deck and immediately discarded. Once any card enters your hand layout, it&apos;s just a point value—no effects!
                    </p>
                </div>
            </div>

            {/* Desktop/tablet: full table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 text-left">
                        <tr>
                            <th className="px-4 py-3 text-sm font-semibold border-b border-slate-600/50 w-[22%] text-slate-200">Card</th>
                            <th className="px-4 py-3 text-sm font-semibold border-b border-slate-600/50 w-[18%] text-slate-200">Suits</th>
                            <th className="px-4 py-3 text-sm font-semibold border-b border-slate-600/50 w-[12%] text-slate-200">Value</th>
                            <th className="px-4 py-3 text-sm font-semibold border-b border-slate-600/50 text-slate-200">Effect (deck only)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={row.name} className={idx % 2 ? "bg-slate-800/30" : "bg-slate-800/20"}>
                                <td className="px-4 py-3 text-slate-200 font-medium border-b border-slate-600/30">{row.name}</td>
                                <td className="px-4 py-3 text-slate-300 border-b border-slate-600/30">
                                    {row.suits === "♥ ♦" ? <span className="text-red-300">♥ ♦</span> :
                                        row.suits === "♠ ♣" ? <span className="text-slate-300">♠ ♣</span> :
                                            row.suits}
                                </td>
                                <td className="px-4 py-3 text-slate-300 border-b border-slate-600/30">{row.value}</td>
                                <td className="px-4 py-3 text-slate-400 border-b border-slate-600/30">{row.effect}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={4} className="px-4 py-3 text-xs text-slate-300 border-t border-amber-600/50 bg-gradient-to-r from-amber-800/20 to-orange-800/20">
                                <strong className="text-amber-300">CRITICAL:</strong> Effects only work when drawn from deck and immediately discarded. Cards in your layout are just point values—no effects!
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}