export interface Mentor {
    id: number;
    created_at: string;
    name: string;
    email: string;
    hometown: string;
    grade: string;
    overseas_experience: string;
    universities: string;
    university_types: string;
    majors: string;
    major_circumstances: string;
    specific_majors: string;
    study_abroad_area: string;
    study_abroad_country: string;
    budget: string;
    scholarship: string;
    study_abroad_type: string;
    first_reason: string;
    second_reason: string;
    third_reason: string;
    second_current_motivation: string;
    first_current_motivation: string;
    third_current_motivation: string;
    first_concern: string;
    second_concern: string;
    third_concern: string;
    fourth_concern: string;
    fifth_concern: string;
    resolved_concerns: string;
    future_image: string;
    personalities: string;
    hobbies: string;
    links: string;
    message: string;
  }
  
  export interface Mentee {
    created_at: string;
    email: string;
    name: string;
    grade: string;
    hometown: string;
    study_abroad_area: string;
    study_abroad_country: string;
    majors: string;
    timing: string;
    study_abroad_type: string;
    university_types: string;
    first_reason: string;
    second_reason: string;
    third_reason: string;
    first_concern: string;
    second_concern: string;
    third_concern: string;
    fourth_concern: string;
    fifth_concern: string;
    future_image: string;
    personalities: string;
    hobbies: string;
    comment: string;
  }
  
  export interface Priority {
    id: number;
    concern_title: string;
    concern: number;
    reasons: number;
    future_image: number;
    personality: number;
    personality_talkative: number;
    personality_positive: number;
    major: number;
    major_AorS: number;
    country: number;
    study_abroad_type: number;
    university_type: number;
    hometown: number;
    hobbies: number;
    final_grade: number;
    admissions_support: number;
  }