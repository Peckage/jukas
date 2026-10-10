import type { Player } from "@/components/scores/storage";

/**
 * The score keeper shows lives, not points. A game is still kept in points
 * (what the cards add up to, as the rules count them); a player starts with
 * the elimination threshold as lives and every point costs one. A red King
 * (−1 point) gives a life back; at 0 lives the player is out.
 */
export function livesLeft(total: number, threshold: number) {
  return threshold - total;
}

/** A round's points as a change in lives: "−12", "+1", "0". */
export function formatLifeChange(points: number) {
  if (points > 0) return `−${points}`;
  if (points < 0) return `+${-points}`;
  return "0";
}

/**
 * A player's lives at the start and after each round they played, ending
 * at the round they went out (where their lives are shown as 0).
 */
export function livesTimeline(player: Player, threshold: number) {
  const timeline = [threshold];
  let total = 0;
  for (let round = 0; round < player.rounds.length; round++) {
    total += player.rounds[round] || 0;
    if (total >= threshold) {
      timeline.push(0);
      break;
    }
    timeline.push(threshold - total);
  }
  return timeline;
}
