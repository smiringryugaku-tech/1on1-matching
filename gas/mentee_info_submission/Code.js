function test_onFormSubmit() {
  const fakeEvent = {
    values: [
      '2024/06/01 12:00:00',       // created_at
      'test@example.com',           // email
      'Taro Test',                  // name
      '高校3年生',                    // grade
      '東京都',                     // hometown
      '北アメリカ, ヨーロッパ',                 // study_abroad_area
      'アメリカ, フランス',                   // study_abroad_country
      '理系, 🔭 自然科学系（物理学、化学、生物学、地球科学、環境学、天文学など）, 💻 情報系（情報科学、データサイエンス、統計学など）',     // majors
      '2024年9月',                  // timing
      '正規・学部留学（学位の取得が目的）, 交換留学',                   // study_abroad_type
      'University（3~4年制）, コミュニティーカレッジ',                   // university_types
      'より大きなことへの挑戦心', // first_reason
      '海外の文化や環境への魅力',  // second_reason
      '将来のキャリア形成',     // third_reason
      'お金・費用・奨学金',             // first_concern
      '語学力',               // second_concern
      '語学塾・あっせん企業選び / だれを頼ればいいのか',                 // third_concern
      '留学先での人間関係', // fourth_concern
      '留学への漠然とした不安・全体像',             // fifth_concern
      '海外就職, ワクワクを追い求める, リーダーシップ, 自分の軸や信念、価値観をしっかり持つ, 行動力',   // future_image
      '聞き上手, 感情を読み取る, 準備・計画型, 自分の経験をたくさん語れる',                     // personalities
      '音楽を聴くこと, 映画鑑賞',  // hobbies
      '海外生活に興味があり、異文化に触れたいという思いがあります。' // comment
    ]
  };
  onFormSubmit(fakeEvent);
}

function onFormSubmit(e) {
  const SUPABASE_ANON_KEY = PropertiesService.getScriptProperties().getProperty('SUPABASE_ANON_KEY');
  const row = e.values;

  const payload = {
    created_at: row[0],
    email: row[1],
    name: row[2],
    grade: row[3],
    hometown: row[4],
    study_abroad_area: row[5],
    study_abroad_country: row[6],
    majors: row[7],
    timing: row[8],
    study_abroad_type: row[9],
    university_types: row[10],
    first_reason: row[11],
    second_reason: row[12],
    third_reason: row[13],
    first_concern: row[14],
    second_concern: row[15],
    third_concern: row[16],
    fourth_concern: row[17],
    fifth_concern: row[18],
    future_image: row[19],
    personalities: row[20],
    hobbies: row[21],
    comment: row[22],
  };

  const url = "https://snibxjnxzmqlauiudldt.functions.supabase.co/match_mentors";

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`
    },
  };

  const response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
}
