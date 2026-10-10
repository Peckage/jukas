/**
 * The colour roles a tile or callout can take. Each maps to whole class
 * strings (Tailwind only generates classes it can read in the source).
 *
 * `primary` is the default for anything that is not a verdict or an effect;
 * the rest carry meaning: a good card, a close call, out, and the three card
 * effects.
 */
export type Tone =
  | "primary"
  | "success"
  | "warning"
  | "destructive"
  | "peek"
  | "swap"
  | "look";

export const TONE: Record<Tone, { surface: string; text: string }> = {
  primary: { surface: "bg-primary-surface border-primary/30", text: "text-primary" },
  success: { surface: "bg-success-surface border-success/30", text: "text-success" },
  warning: { surface: "bg-warning-surface border-warning/30", text: "text-warning" },
  destructive: {
    surface: "bg-destructive-surface border-destructive/35",
    text: "text-destructive",
  },
  peek: { surface: "bg-peek-surface border-peek/30", text: "text-peek" },
  swap: { surface: "bg-swap-surface border-swap/30", text: "text-swap" },
  look: { surface: "bg-look-surface border-look/30", text: "text-look" },
};
