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
    universities: row[10],
    first_reason: row[11],
    second_reason: row[12],
    third_reason: row[13],
    first_concern: row[14],
    second_concern: row[15],
    third_concern: row[16],
    fourth_concern: row[17],
    fifth_concern: row[18],
    future_image: row[19],
    personality: row[20],
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
