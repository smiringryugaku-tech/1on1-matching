import type { Mentor, Mentee, Priority } from "./types.ts";

function convertNewlinesToBr(text: string): string {
  return text.replace(/\n/g, '<br>');
}

function tableContent(key: string, value: string): string {
  return `
    <tr>
      <td style="font-weight: bold; padding: 10px; background-color: #e6f7ff; border-radius: 8px; width: 20%;">${key}</td>
      <td style="padding: 10px; background-color: #ffffff; border: 2px solid #0077cc; border-radius: 8px;">${value}</td>
    </tr>
  `;
}

function mentorProfileHTML(mentor: Mentor): string {
  return `
    <div style="font-family: Arial, sans-serif; margin-bottom: 20px;">
      <h2 style="font-size: 24px; color: #0077cc; margin-bottom: 10px;">${mentor.name}</h2>
      <table style="width: 100%; border-collapse: separate; border-spacing: 10px; font-size: 14px;">
        ${tableContent("出身地", mentor.hometown)}
        ${tableContent("学年", mentor.grade)}
        ${tableContent("留学先", mentor.study_abroad_country)}
        ${tableContent("留学形態", mentor.study_abroad_type)}
        ${tableContent("大学", mentor.universities)}
        ${tableContent("専攻", mentor.specific_majors)}
        ${tableContent("趣味", mentor.hobbies)}
        ${tableContent("プロフィール", mentor.links === "" ? "なし" : convertNewlinesToBr(mentor.links))}
        ${tableContent("一言", convertNewlinesToBr(mentor.message))}
      </table>
    </div>
  `;
}

function sortPriorityScores(priorityScores: Priority): string[] {
  const entries = Object.entries(priorityScores).filter(([key, _]) => key !== "id" && key !== "concern_title");
  entries.sort((a, b) => b[1] - a[1]);

  const sortedKeys = entries.map(([key, _]) => key);
  console.log(" --> Sorted priority keys: ", sortedKeys);
  return sortedKeys;
}

function priorityKeyToJapanese(input: string): string {
  const responseMap: {[key: string]: string} = {
    concern: "留学の悩み：あなたと似た悩みを持っていたメンター",
    reasons: "留学に興味がある理由：あなたと似た理由で留学に興味があるメンター",
    future_image: "将来のイメージ：将来のイメージが近いメンター",
    personality: "性格：あなたが求める性格に近いメンター",
    personality_talkative: "話しやすさ：話しやすいメンター",
    personality_positive: "ポジティブさ：ポジティブなメンター",
    major: "専攻：あなたの興味と似ている分野を専攻しているメンター",
    major_AorS: "文理：あなたと同じ文系or理系のメンター",
    country: "留学先：あなたの興味と同じ留学先にいるメンター",
    study_abroad_type: "留学形態：あなたの興味と同じ留学形態のメンター",
    university_type: "大学の種類：あなたの興味と同じ大学に通っているメンター",
    hometown: "出身地：出身地が近いメンター",
    hobbies: "趣味：趣味が似ているメンター",
    final_grade: "最終学年：大学4年生以上のメンター",
    admissions_support: "進学支援メンバー：海外進学サポートチームのメンター"
  };
  // console.log(" --> Converting priority key to Japanese: ", input, ": ", responseMap);
  return responseMap[input] ?? input;
}

export async function sendEmail(apikey: string, mentee: Mentee, mentors: Mentor[], priorityScores: Priority) {
  console.log(" --> Send email to mentee: matched mentors", mentors, "\n");

  const sortedPriority = sortPriorityScores(priorityScores);
  const handler = async (_req: Request): Promise<Response> => {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify({
        from: "SmiRing <tech-team@matching.smiring-ryugaku.com>",
        to: ["shogo.toiyama@gmail.com", mentee.email],
        subject: `【🤖Tech】${mentee.name}さんのメンターがマッチングしました！`,
        html: `
          <h1 style = "font-weight: bold">${mentee.name}さんの情報</h1>
            <table style="width: 100%; border-collapse: separate; border-spacing: 10px; font-size: 14px;">
              ${tableContent("出身地", mentee.hometown)}
              ${tableContent("学年", mentee.grade)}
              ${tableContent("興味のある留学先", mentee.study_abroad_area)}
              ${tableContent("留学形態", mentee.study_abroad_type)}
              ${tableContent("専攻", mentee.majors)}
              ${tableContent("留学に興味がある理由", `1. ${mentee.first_reason}<br>2. ${mentee.second_reason}<br>3. ${mentee.third_reason}`)}
              ${tableContent("留学の悩み", `1. ${mentee.first_concern}<br>2. ${mentee.second_concern}<br>3. ${mentee.third_concern}<br>4. ${mentee.fourth_concern}<br>5. ${mentee.fifth_concern}`)}
              ${tableContent("趣味", mentee.hobbies)}
              ${tableContent("一言", convertNewlinesToBr(mentee.comment))}
            </table>

          <hr>

          <h1 style = "font-weight: bold">マッチしたメンター</h1>
            <div>${mentorProfileHTML(mentors[0])}</div>
            <div>${mentorProfileHTML(mentors[1])}</div>
            <div>${mentorProfileHTML(mentors[2])}</div>
            <div>${mentorProfileHTML(mentors[3])}</div>
            <div>${mentorProfileHTML(mentors[4])}</div>

          <hr>

          <h1 style = "font-weight: bold">マッチングのポイント</h1>
            <p style = "font-weight: bold">以下のような要素を特に重視してマッチングしました！</p>
            <p style = "font-size: 15px">🌟 ${priorityKeyToJapanese(sortedPriority[0])}</p>
            <p style = "font-size: 15px">🌟 ${priorityKeyToJapanese(sortedPriority[1])}</p>
            <p style = "font-size: 15px">🌟 ${priorityKeyToJapanese(sortedPriority[2])}</p>
            <p style = "font-size: 15px">🌟 ${priorityKeyToJapanese(sortedPriority[3])}</p>
            <p style = "font-size: 15px">🌟 ${priorityKeyToJapanese(sortedPriority[4])}</p>

          <hr>

          <p>気になるメンターさんがいれば、今すぐ1on1を申し込み！</p>
          <p>お申し込み・日程調整はこちらから（今はダミーのリンクです。）👇</p>
          <a>https://forms.gle/b4ybXZuYbPMkAncu6</a>
          <br>
          <p>※もしマッチしたメンターさんに興味がなければ、こちらのメールに返信していただければ再度マッチングを行います。</p>
          <br>
          <p>SmiRing Ryugaku Techチーム</p>
        `,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  console.log(" --> Sending email via Resend API...");
  return handler(new Request("https://api.resend.com/emails", { method: 'POST' }));
}
