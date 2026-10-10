"use client";

import { useEffect, useRef, useState } from "react";
import { livesTimeline } from "@/components/scores/lives";
import type { Player } from "@/components/scores/storage";
import { cn } from "@/lib/utils";

/** By seat; see `--series-*` in globals.css. Never cycled. */
const SERIES = Array.from({ length: 8 }, (_, i) => `var(--series-${i + 1})`);
const OVERFLOW = "var(--muted-foreground)";

export function seriesColor(seat: number) {
  return SERIES[seat] ?? OVERFLOW;
}

const HEIGHT = 240;
const PAD = { top: 12, right: 12, bottom: 28, left: 34 };
/** Room on the right for names at the line ends, when they fit. */
const LABEL_ROOM = 72;

/** The width of an element, kept current as it resizes. */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

/** Round numbers for the y axis: 0, a quarter steps, up to the top. */
function yTicks(max: number) {
  const step = max <= 40 ? 10 : max <= 120 ? 25 : 50;
  const ticks = [];
  for (let v = 0; v <= max; v += step) ticks.push(v);
  return ticks;
}

/**
 * Lives per player, round by round: everyone starts at the threshold and a
 * line ends at 0 the round its player went out. One colour per seat, a
 * legend, names at the line ends when there is room for them, and a
 * crosshair readout of every player at the round under the pointer (or
 * the arrow keys).
 */
export function LivesChart({
  players,
  threshold,
}: {
  players: Player[];
  threshold: number;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);

  const series = players.map((player, seat) => ({
    name: player.name,
    seat,
    color: seriesColor(seat),
    lives: livesTimeline(player, threshold),
  }));
  const rounds = Math.max(1, ...series.map((s) => s.lives.length - 1));
  const top = Math.max(threshold, ...series.flatMap((s) => s.lives));

  // Names at the line ends, only for a few players and only when no two
  // would sit on top of each other; otherwise the legend and the readout
  // carry identity.
  const ends = series
    .map((s) => s.lives[s.lives.length - 1])
    .sort((a, b) => a - b);
  const plotHeight = HEIGHT - PAD.top - PAD.bottom;
  const minGap = (ends.length > 1
    ? Math.min(...ends.slice(1).map((v, i) => v - ends[i]))
    : Infinity) * (plotHeight / top);
  const directLabels = series.length <= 4 && minGap >= 14;

  const right = PAD.right + (directLabels ? LABEL_ROOM : 0);
  const plotWidth = Math.max(0, width - PAD.left - right);
  const x = (round: number) => PAD.left + (round / rounds) * plotWidth;
  const y = (lives: number) => PAD.top + (1 - lives / top) * plotHeight;

  const roundAt = (clientX: number, rect: DOMRect) => {
    const ratio = (clientX - rect.left - PAD.left) / Math.max(1, plotWidth);
    return Math.max(0, Math.min(rounds, Math.round(ratio * rounds)));
  };

  // Every label: with many rounds, every second (or fifth) one.
  const xEvery = rounds > 20 ? 5 : rounds > 10 ? 2 : 1;

  const readout =
    active === null
      ? null
      : series
          .map((s) => ({ ...s, value: s.lives[active] }))
          .filter((s) => s.value !== undefined)
          .sort((a, b) => b.value - a.value);

  return (
    <figure className="space-y-3">
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        {series.map((s) => (
          <li key={s.seat} className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="h-0.5 w-3.5 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            {s.name}
          </li>
        ))}
      </ul>

      <div ref={ref} className="relative" style={{ height: HEIGHT }}>
        {width > 0 && (
          <svg
            width={width}
            height={HEIGHT}
            role="img"
            aria-label={`Lives per round for ${series.length} players, over ${rounds} rounds`}
            className="overflow-visible"
          >
            {yTicks(top).map((tick) => (
              <g key={tick}>
                <line
                  x1={PAD.left}
                  x2={PAD.left + plotWidth}
                  y1={y(tick)}
                  y2={y(tick)}
                  stroke="var(--border)"
                  strokeWidth={1}
                />
                <text
                  x={PAD.left - 8}
                  y={y(tick)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-muted-foreground text-2xs tabular-nums"
                >
                  {tick}
                </text>
              </g>
            ))}

            {Array.from({ length: rounds + 1 }, (_, round) => round)
              .filter((round) => round % xEvery === 0 || round === rounds)
              .map((round) => (
                <text
                  key={round}
                  x={x(round)}
                  y={HEIGHT - 8}
                  textAnchor="middle"
                  className="fill-muted-foreground text-2xs tabular-nums"
                >
                  {round === 0 ? "Start" : `R${round}`}
                </text>
              ))}

            {active !== null && (
              <line
                x1={x(active)}
                x2={x(active)}
                y1={PAD.top}
                y2={PAD.top + plotHeight}
                stroke="var(--border-strong)"
                strokeWidth={1}
              />
            )}

            {series.map((s) => {
              const last = s.lives.length - 1;
              const out = s.lives[last] === 0;
              return (
                <g key={s.seat}>
                  <polyline
                    points={s.lives.map((v, r) => `${x(r)},${y(v)}`).join(" ")}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  {/* The end of a line: a ringed dot, hollow when the
                      player went out there. */}
                  <circle
                    cx={x(last)}
                    cy={y(s.lives[last])}
                    r={4}
                    fill={out ? "var(--card)" : s.color}
                    stroke={out ? s.color : "var(--card)"}
                    strokeWidth={2}
                  />
                  {active !== null && s.lives[active] !== undefined && (
                    <circle
                      cx={x(active)}
                      cy={y(s.lives[active])}
                      r={4}
                      fill={s.color}
                      stroke="var(--card)"
                      strokeWidth={2}
                    />
                  )}
                  {directLabels && (
                    <text
                      x={x(last) + 9}
                      y={y(s.lives[last])}
                      dominantBaseline="middle"
                      className="fill-foreground text-2xs font-medium"
                    >
                      {s.name.length > 9 ? `${s.name.slice(0, 8)}…` : s.name}
                    </text>
                  )}
                </g>
              );
            })}

            {/* The hit area: the whole plot, so the pointer only has to be
                near a round, never on a line. */}
            <rect
              x={PAD.left}
              y={PAD.top}
              width={plotWidth}
              height={plotHeight}
              fill="transparent"
              tabIndex={0}
              aria-label="Use the arrow keys to read each round"
              className="cursor-crosshair outline-none focus-visible:stroke-ring"
              onPointerMove={(e) =>
                setActive(roundAt(e.clientX, e.currentTarget.getBoundingClientRect()))
              }
              onPointerDown={(e) =>
                setActive(roundAt(e.clientX, e.currentTarget.getBoundingClientRect()))
              }
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") setActive(null);
              }}
              onBlur={() => setActive(null)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const step = e.key === "ArrowRight" ? 1 : -1;
                  setActive((r) =>
                    Math.max(0, Math.min(rounds, (r ?? (step > 0 ? -1 : rounds + 1)) + step))
                  );
                }
              }}
            />
          </svg>
        )}

        {readout && active !== null && (
          <div
            aria-live="polite"
            className={cn(
              "pointer-events-none absolute top-2 min-w-36 rounded-lg border border-border-strong p-2.5 text-xs shadow-overlay glass-overlay",
              // Opposite the crosshair, so it never covers the round it reads.
              x(active) > width / 2 ? "left-10" : "right-2"
            )}
          >
            <p className="mb-1.5 font-semibold">
              {active === 0 ? "Start" : `After round ${active}`}
            </p>
            <ul className="space-y-1">
              {readout.map((s) => (
                <li key={s.seat} className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-0.5 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="font-semibold text-foreground tabular-nums">
                    {s.value === 0 ? "Out" : s.value}
                  </span>
                  <span className="truncate text-muted-foreground">{s.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <details className="group text-sm">
        <summary className="flex min-h-10 cursor-pointer items-center text-xs font-medium text-muted-foreground hover:text-foreground">
          Round by round
        </summary>
        <div className="mt-1 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-xs tabular-nums">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="px-3 py-2 text-left font-medium">Round</th>
                {series.map((s) => (
                  <th key={s.seat} className="px-3 py-2 text-right font-medium">
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rounds + 1 }, (_, round) => (
                <tr key={round} className="border-b border-border last:border-0">
                  <th scope="row" className="px-3 py-2 text-left font-medium">
                    {round === 0 ? "Start" : round}
                  </th>
                  {series.map((s) => (
                    <td key={s.seat} className="px-3 py-2 text-right">
                      {s.lives[round] === undefined
                        ? ""
                        : s.lives[round] === 0
                          ? "Out"
                          : s.lives[round]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
