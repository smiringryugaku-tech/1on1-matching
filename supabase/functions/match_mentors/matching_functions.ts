import { Mentor, Mentee } from './types';

// export type ScoreRatios = Record<string, number>;

// function initScoreRatios(priorities: { items: string}[]): ScoreRatios {
//   const scoreRatios: ScoreRatios = {};
//   for (const p of priorities) scoreRatios[String(p.items)] = 0;
//   return scoreRatios;
// }

export function onlyOneSelection(key: string, mentee: Mentee, mentors: Mentor[]): number[] {
  const scores: number[] = [];
  for (const mentor of mentors) {
    if (mentee[key] === mentor[key]) {
      scores.push(1);
    } else {
      scores.push(0);
    }
  }
  return scores;
}

function levSelRatio(key: string): number {
  if (key.includes("first")) {
    return 1;
  }
  else if (key.includes("second")) {
    return 0.5;
  }
  else if (key.includes("third")) {
    return 0.4;
  } else  if (key.includes("fourth")) {
    return 0.3;
  } else if (key.includes("fifth")) {
    return 0.2;
  } else {
    return 0;
  }
}

function stripPrefix(key: string): string {
  return key.split("_", 2)[1] ?? key;
}

export function levelSelection(key: keyof Mentee, mentee: Mentee, mentors: Mentor[]): number[] {
  const ratio = levSelRatio(key);
  const strippedKey = stripPrefix(key);
  const scores: number[] = [];
  for (const mentor of mentors) {
    if (`first_${strippedKey}` in mentor && mentee[key] === mentor[`first_${strippedKey}`]) {
      scores.push(1 * ratio);
    }
    else if (`second_${strippedKey}` in mentor && mentee[key] === mentor[`second_${strippedKey}`]) {
      scores.push(0.9 * ratio);
    }
    else if (`third_${strippedKey}` in mentor && mentee[key] === mentor[`third_${strippedKey}`]) {
      scores.push(0.8 * ratio);
    }
    else if (`fourth_${strippedKey}` in mentor && mentee[key] === mentor[`fourth_${strippedKey}`]) {
      scores.push(0.7 * ratio);
    }
    else if (`fifth_${strippedKey}` in mentor && mentee[key] === mentor[`fifth_${strippedKey}`]) {
      scores.push(0.6 * ratio);
    }
    else {
      scores.push(0);
    }
  }
  return scores;
}

export function multiSelection(key: string, mentee: Mentee, mentors: Mentor[]): number[] {
  const menteeItems = mentee[key].split(",").map(s => s.trim());
  const scores: number[] = [];
  for (const mentor of mentors) {
    const mentorItems = mentor[key].split(",").map(s => s.trim());
    const commonItems = menteeItems.filter(item => mentorItems.includes(item));
    scores.push(commonItems.length/menteeItems.length);
  }
  return scores;
}

export function inGroupSelection(key: string, mentee: Mentee, mentors: Mentor[], groups: string[][]): number[]{
  const scores: number[] = [];
  for (const mentor of mentors) {
    let score = 0;
    if (mentee[key] === mentor[key]) {
      score = 1;
      break;
    } else {
      for (const group of groups) {
        if (group.includes(mentee[key]) && group.includes(mentor[key])) {
          score = 1;
          break;
        }
      }
    }
    scores.push(score);
  }
  return scores;
}
