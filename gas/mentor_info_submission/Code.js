function test_onFormSubmit() {
  const fakeEvent = {
    values: [
      '2025/08/05 01:00:00',       // created_at
      'Taro Test',                 // name
      'test@example.com',           // email
      '東京都',                     // hometown
      '大学3年',                    // grade
      '1年間の交換留学',            // overseas_experience
      '東京大学, UCLA',             // universities
      '国公立, 海外名門',           // university_types
      '国際関係学, 経営学',         // majors
      '将来の目標に沿って選択',     // major_circumstances
      '国際開発, マーケティング',   // spesific_majors
      '北米',                       // study_abroad_area
      'アメリカ',                   // study_abroad_country
      '300万円',                    // budget
      '柳井正財団',                 // scholarship
      '交換留学',                   // study_abroad_type
      '語学力向上',                 // first_reason
      '専門知識習得',               // second_reason
      '国際ネットワーク構築',       // third_reason
      'TOEFL100達成',               // first_current_motivation
      '海外インターン経験',         // second_current_motivation
      '現地NPO参加',                // third_current_motivation
      '費用面の不安',               // first_concern
      '語学力不足',                 // second_concern
      '文化適応',                   // third_concern
      '就職活動への影響',           // fourth_concern
      '治安面',                     // fifth_concern
      '奨学金で解消',               // resolved_concerns
      '国際機関で働く',             // future_image
      '社交的, チャレンジ精神旺盛', // parsonalities
      '旅行, 読書, スポーツ',        // hobbies
      'https://profile.link.com',  // links
      '頑張ってください！'          // message
    ]
  };

  onFormSubmit(fakeEvent);
}



function onFormSubmit(e) {
  const props = PropertiesService.getScriptProperties();
  const SUPABASE_URL = props.getProperty('SUPABASE_URL');
  const SUPABASE_API_KEY = props.getProperty('SUPABASE_API_KEY');
  const TABLE_NAME = 'mentors_info';

  const created_at = e.values[0];
  const email = e.values[1];
  const name = e.values[2];
  const hometown = e.values[3];
  const grade = e.values[4];
  const overseas_experience = e.values[5];
  const universities = e.values[6];
  const university_types = e.values[7];
  const majors = e.values[8];
  const major_circumstances = e.values[9];
  const spesific_majors = e.values[10];
  const study_abroad_area = e.values[11];
  const study_abroad_country = e.values[12];
  const budget = e.values[13];
  const scholarship = e.values[14];
  const study_abroad_type = e.values[15];
  const first_reason = e.values[16];
  const second_reason = e.values[17];
  const third_reason = e.values[18];
  const first_current_motivation = e.values[19];
  const second_current_motivation = e.values[20];
  const third_current_motivation = e.values[21];
  const first_concern = e.values[22];
  const second_concern = e.values[23];
  const third_concern = e.values[24];
  const fourth_concern = e.values[25];
  const fifth_concern = e.values[26];
  const resolved_concerns = e.values[27];
  const future_image = e.values[28];
  const personalities = e.values[29];
  const hobbies = e.values[30];
  const links = e.values[31];
  const message = e.values[32];

  const payload = {
    created_at,
    name,
    email,
    hometown,
    grade,
    overseas_experience,
    universities,
    university_types,
    majors,
    major_circumstances,
    spesific_majors,
    study_abroad_area,
    study_abroad_country,
    budget,
    scholarship,
    study_abroad_type,
    first_reason,
    second_reason,
    third_reason,
    first_current_motivation,
    second_current_motivation,
    third_current_motivation,
    first_concern,
    second_concern,
    third_concern,
    fourth_concern,
    fifth_concern,
    resolved_concerns,
    future_image,
    personalities,
    hobbies,
    links,
    message
  };

  const query = `name=eq.${encodeURIComponent(name)}&or=(email.eq.${encodeURIComponent(email)})`;
  const checkOptions = {
    method: 'get',
    headers: {
      'apikey': SUPABASE_API_KEY,
      'Authorization': 'Bearer ' + SUPABASE_API_KEY
    }
  };

  const checkRes = UrlFetchApp.fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?${query}`, checkOptions);
  const existing = JSON.parse(checkRes.getContentText());

  if (existing.length > 0) {
    const id = existing[0].id;
    const updateOptions = {
      method: 'patch',
      contentType: 'application/json',
      headers: {
        'apikey': SUPABASE_API_KEY,
        'Authorization': 'Bearer ' + SUPABASE_API_KEY
      },
      payload: JSON.stringify(payload)
    };
    const updateRes = UrlFetchApp.fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?id=eq.${id}`, updateOptions);
    Logger.log(`Updated record ID ${id}: ${updateRes.getResponseCode()}`);
  } else {
    const insertOptions = {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'apikey': SUPABASE_API_KEY,
        'Authorization': 'Bearer ' + SUPABASE_API_KEY
      },
      payload: JSON.stringify(payload)
    };
    const insertRes = UrlFetchApp.fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, insertOptions);
    Logger.log(`Inserted new record: ${insertRes.getResponseCode()}`);
  }
}
