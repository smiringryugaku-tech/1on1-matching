import type { Mentor, Mentee } from "./types.ts";

export type Scores = Record<string, number>;

function initScores(mentors: { id: number}[]): Scores {
  const scores: Scores = {};
  for (const m of mentors) scores[String(m.id)] = 0;
  return scores;
}

export function calculateScores(mentee: Mentee, mentors: Mentor[]): Array<Mentor & { score: number }>  {
  const scores = initScores(mentors);
  const priorityKey = "majors";

  return mentors
    .map(m => {
      const score = m[priorityKey] === mentee[priorityKey] ? 1 : 0;
      return { ...m, score };
    })
    .filter(m => m.score > 0) // 一致したメンターだけ残す
    .sort((a, b) => b.score - a.score);
  }
  