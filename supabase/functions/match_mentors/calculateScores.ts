export function calculateScores(mentee: any, mentors: any[]) {
    // 今は「最高優先度の項目1つだけが完全一致」ならスコア1、それ以外は0
    // 仮に最高優先度項目を majors にする
    const priorityKey = "majors";
  
    return mentors
      .map(m => {
        const score = m[priorityKey] === mentee[priorityKey] ? 1 : 0;
        return { ...m, score };
      })
      .filter(m => m.score > 0) // 一致したメンターだけ残す
      .sort((a, b) => b.score - a.score);
  }
  