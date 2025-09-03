import type { Mentor, Mentee, Priority } from "./types.ts";
import { onlyOneSelection, levelSelection, multiSelection, inGroupSelection, specificContentSelection } from "./matching_functions.ts";

export function caluclatePriorityScores(mentee: Mentee, priorities: Priority[]): Priority {
  let concernsRatio = new Array(priorities.length).fill(0);
  let priorityScores: Priority = {
    id: 0, 
    concern_title: "priorityScores", 
    concern: 0,
    reasons: 0,
    future_image: 0,
    personality: 0,
    personality_talkative: 0,
    personality_positive: 0,
    major: 0,
    major_AorS: 0,
    country: 0,
    study_abroad_type: 0,
    university_type: 0,
    hometown: 0,
    hobbies: 0,
    final_grade: 0,
    admissions_support: 0
  };

  for (const p of priorities) {
    if (p.concern_title === mentee.first_concern) {
      concernsRatio[p.id - 1] = 1;
    } else if (p.concern_title === mentee.second_concern) {
      concernsRatio[p.id - 1] = 0.6;
    } else if (p.concern_title === mentee.third_concern) {
      concernsRatio[p.id - 1] = 0.5;
    } else if (p.concern_title === mentee.fourth_concern) {
      concernsRatio[p.id - 1] = 0.4;
    } else if (p.concern_title === mentee.fifth_concern) {
      concernsRatio[p.id - 1] = 0.3;
    }
  }

  for (let i = 0; i < priorities.length; i++) {
    const p = priorities[i];
    const ratio = concernsRatio[i];
    if (ratio === 0) continue;
    priorityScores.concern += p.concern * ratio;
    priorityScores.reasons += p.reasons * ratio;
    priorityScores.future_image += p.future_image * ratio;
    priorityScores.personality += p.personality * ratio;
    priorityScores.personality_talkative += p.personality_talkative * ratio;
    priorityScores.personality_positive += p.personality_positive * ratio;
    priorityScores.major += p.major * ratio;
    priorityScores.major_AorS += p.major_AorS * ratio;
    priorityScores.country += p.country * ratio;
    priorityScores.study_abroad_type += p.study_abroad_type * ratio;
    priorityScores.university_type += p.university_type * ratio;
    priorityScores.hometown += p.hometown * ratio;
    priorityScores.hobbies += p.hobbies * ratio;
    priorityScores.final_grade += p.final_grade * ratio;
    priorityScores.admissions_support += p.admissions_support * ratio;
  }

  console.log("  Calculated priority scores:\n", priorityScores, "\n");
  return priorityScores;
}

export function calculateScores(mentee: Mentee, mentors: Mentor[], priorityScores: Priority): Array<Mentor & { score: number }>  {

  if (priorityScores.admissions_support > 1) {
    console.log("  Admissions support priority > 1, filtering mentors who can provide admissions support");
    return [];
  };

  const firstConcernScore = levelSelection("first_concern", mentee, mentors);
  const secondConcernScore = levelSelection("second_concern", mentee, mentors);
  const thirdConcernScore = levelSelection("third_concern", mentee, mentors);
  const fourthConcernScore = levelSelection("fourth_concern", mentee, mentors);
  const fifthConcernScore = levelSelection("fifth_concern", mentee, mentors);
  const firstReasonScore = levelSelection("first_reason", mentee, mentors);
  const secondReasonScore = levelSelection("second_reason", mentee, mentors);
  const thirdReasonScore = levelSelection("third_reason", mentee, mentors);
  const futureImageScore = multiSelection("future_image", mentee, mentors);
  const personalitiesScore = multiSelection("personalities", mentee, mentors);
  const talkativeScore = specificContentSelection("personalities", mentee, mentors, ["話好き"]);
  const positiveScore = specificContentSelection("personalities", mentee, mentors, ["ポジティブ"]);
  const majorScore = multiSelection("majors", mentee, mentors);
  const majorAScore = specificContentSelection("majors", mentee, mentors, ["文系"]);
  const majorSScore = specificContentSelection("majors", mentee, mentors, ["理系"]);
  const countryScore = multiSelection("study_abroad_area", mentee, mentors);
  const studyAbroadTypeScore = multiSelection("study_abroad_type", mentee, mentors);
  const universityTypeScore = multiSelection("university_types", mentee, mentors);
  const hometownScore = inGroupSelection("hometown", mentee, mentors, [
    ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
    ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"],
    ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県"], 
    ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"],
    ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
    ["徳島県", "香川県", "愛媛県", "高知県"],
    ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"],
    ["海外"]
  ]);
  const hobbiesScore = multiSelection("hobbies", mentee, mentors);
  const finalGradeScore = specificContentSelection("grade", mentee, mentors, ["大学4年", "大学院生", "既卒性/社会人"]);

  const concernScore = firstConcernScore.map((score, index) => {
    return (
      score * 1 +
      secondConcernScore[index] * 0.9 +
      thirdConcernScore[index] * 0.8 +
      fourthConcernScore[index] * 0.7 +
      fifthConcernScore[index] * 0.6
    )
  });

  const reasonScore = firstReasonScore.map((score, index) => {
    return (
      score * 1 +
      secondReasonScore[index] * 0.9 +
      thirdReasonScore[index] * 0.8
    )
  });

  const totalScores = concernScore.map((score, index) => {
    return (
      score * priorityScores.concern +
      reasonScore[index] * priorityScores.reasons +
      futureImageScore[index] * priorityScores.future_image +
      personalitiesScore[index] * priorityScores.personality +
      talkativeScore[index] * priorityScores.personality_talkative +
      positiveScore[index] * priorityScores.personality_positive +
      majorScore[index] * priorityScores.major +
      majorAScore[index] * priorityScores.major_AorS +
      majorSScore[index] * priorityScores.major_AorS +
      countryScore[index] * priorityScores.country +
      studyAbroadTypeScore[index] * priorityScores.study_abroad_type +
      universityTypeScore[index] * priorityScores.university_type +
      hometownScore[index] * priorityScores.hometown +
      hobbiesScore[index] * priorityScores.hobbies +
      finalGradeScore[index] * priorityScores.final_grade
    )
  });

  const mentorsWithScores = mentors.map((mentor, index) => {
    return { ...mentor, score: totalScores[index] };
  });

  return mentorsWithScores.sort((a, b) => b.score - a.score);
}