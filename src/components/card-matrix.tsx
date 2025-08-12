"use client";

import React from "react";

type Suit = "hearts" | "diamonds" | "clubs" | "spades";
type Rank =
    | "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
const ranks: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const suitIcon: Record<Suit, string> = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠",
};

const suitColor = (s: Suit) =>
    s === "hearts" || s === "diamonds" ? "text-red-400" : "text-slate-300";

function cardValue(rank: Rank, suit: Suit): number {
    if (rank === "A") return 1;
    if (rank === "Q") return 12;
    if (rank === "J") return 11;
    if (rank === "K") return (suit === "hearts" || suit === "diamonds") ? -1 : 13;
    if (["7", "8", "9", "10"].includes(rank)) return parseInt(rank, 10);
    // 2–6
    return parseInt(rank as string, 10);
}

function cardEffect(rank: Rank, suit: Suit): string {
    if (rank === "A") return "Ace = 1 point. No effect.";
    if (["2", "3", "4", "5", "6"].includes(rank)) return `${rank} points. No effect.`;
    if (rank === "7" || rank === "8")
        return `${rank} points. Play to peek one of your own cards; if you keep the ${rank} in that spot, immediately take another turn.`;
    if (rank === "9" || rank === "10")
        return `${rank} points. Blindly swap one of your cards with an opponent (don’t look).`;
    if (rank === "J")
        return "11 points. Peek at an opponent’s card; you may swap it with the Jack you played.";
    if (rank === "Q")
        return "12 points. No effect (expensive).";
    // Kings
    if (suit === "hearts" || suit === "diamonds")
        return "Red King = −1 point. No effect (great).";
    return "Black King = +13 points. No effect (awful).";
}

export default function CardsMatrix() {
    return (
        <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
                <table className="min-w-[720px] w-full border-collapse">
                    <thead className="bg-white/5 sticky top-0 z-10">
                        <tr className="text-left text-slate-200">
                            <th className="px-4 py-3 text-sm font-semibold border-b border-white/10 w-24">
                                Rank
                            </th>
                            {suits.map((s) => (
                                <th
                                    key={s}
                                    className="px-4 py-3 text-sm font-semibold border-b border-white/10"
                                >
                                    <span className={`inline-flex items-center gap-2 ${suitColor(s)}`}>
                                        <span className="text-lg leading-none">{suitIcon[s]}</span>
                                        <span className="capitalize text-slate-300">{s}</span>
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {ranks.map((r, ri) => (
                            <tr key={r} className={ri % 2 ? "bg-white/0" : "bg-white/[.02]"}>
                                <td className="px-4 py-3 text-slate-300 border-b border-white/10 font-semibold">
                                    {r}
                                </td>
                                {suits.map((s) => {
                                    const val = cardValue(r, s);
                                    const effect = cardEffect(r, s);
                                    return (
                                        <td
                                            key={`${r}-${s}`}
                                            className="px-4 py-3 align-top border-b border-white/10"
                                        >
                                            <div className="group rounded-lg border border-white/[.08] bg-white/[.03] hover:bg-white/[.06] transition p-3 shadow-inner">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-base ${suitColor(s)}`}>
                                                            {suitIcon[s]}
                                                        </span>
                                                        <span className="text-sm text-slate-200 font-medium">
                                                            {r} of {s.charAt(0).toUpperCase() + s.slice(1)}
                                                        </span>
                                                    </div>
                                                    <span className="inline-flex items-center rounded-md border border-white/10 bg-black/30 px-2 py-0.5 text-xs font-semibold text-slate-200">
                                                        {val >= 0 ? `${val} pts` : `${val} pt`}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-400 leading-snug">
                                                    {effect}
                                                </p>
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-4 py-3 text-xs text-slate-400 border-t border-white/10">
                Notes: Suits only affect Kings. Red K = −1; Black K = +13. Other cards have identical effects across suits.
            </div>
        </div>
    );
}
