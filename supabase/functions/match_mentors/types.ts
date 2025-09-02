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
    linkes: string;
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
    universities: string;
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
  