const othersText = 'others_option';
export const serviceOptions = [
  {
    value: 'visa',
    label: 'Visa',
    price: '€15 / Hour',
    imgPath: '/visa.jpeg',
  },
  {
    value: 'anmelden',
    label: 'Address Register (Anmeldung)',
    price: '€15 / Hour',
    imgPath: '/anmelden.jpeg',
  },
  {
    value: 'arzt',
    label: 'Doctor Appointment',
    price: '€15 / Hour',
    imgPath: '/arzt.jpeg',
  },
  {
    value: 'apartmentVisit',
    label: 'Apartment Visit',
    price: '€15 / Hour',
    imgPath: '/wohnung.jpeg',
  },
  {
    value: 'bankAccount',
    label: 'Open a Bank Account',
    price: '€15 / Hour',
    imgPath: '/bank.jpeg',
  },
  {
    value: 'Others',
    label: 'Others',
    price: '€15 / Hour',
    imgPath: '/offer_help.jpeg',
  },
];

export const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'neutral', label: "Don't want to tell" },
];

export const meetTimeOptions = [
  { value: '7:00am-7:30am', label: '7:00am-7:30am' },
  { value: '7:30am-8:00am', label: '7:30am-8:00am' },
  { value: '8:00am-8:30am', label: '8:00am-8:30am' },
  { value: '8:30am-9:00am', label: '8:30am-9:00am' },
  { value: '9:00am-9:30am', label: '9:00am-9:30am' },
  { value: '9:30am-10:00am', label: '9:30am-10:00am' },
  { value: '10:00am-10:30am', label: '10:00am-10:30am' },
  { value: '10:30am-11:00am', label: '10:30am-11:00am' },
  { value: '11:00am-11:30am', label: '11:00am-11:30am' },
  { value: '11:30am-12:00pm', label: '11:30am-12:00pm' },
  { value: '12:00pm-12:30pm', label: '12:00pm-12:30pm' },
  { value: '12:30pm-1:00pm', label: '12:30pm-1:00pm' },
  { value: '1:00pm-1:30pm', label: '1:00pm-1:30pm' },
  { value: '1:30pm-2:00pm', label: '1:30pm-2:00pm' },
  { value: '2:00pm-2:30pm', label: '2:00pm-2:30pm' },
  { value: '2:30pm-3:00pm', label: '2:30pm-3:00pm' },
  { value: '3:00pm-3:30pm', label: '3:00pm-3:30pm' },
  { value: '3:30pm-4:00pm', label: '3:30pm-4:00pm' },
  { value: '4:00pm-4:30pm', label: '4:00pm-4:30pm' },
  { value: '4:30pm-5:00pm', label: '4:30pm-5:00pm' },
  { value: '5:00pm-5:30pm', label: '5:00pm-5:30pm' },
  { value: '5:30pm-6:00pm', label: '5:30pm-6:00pm' },
  { value: '6:00pm-6:30pm', label: '6:00pm-6:30pm' },
  { value: '6:30pm-7:00pm', label: '6:30pm-7:00pm' },
  { value: '7:00pm-7:30pm', label: '7:00pm-7:30pm' },
  { value: '7:30pm-8:00pm', label: '7:30pm-8:00pm' },
  { value: '8:00pm-8:30pm', label: '8:00pm-8:30pm' },
  { value: '8:30pm-9:00pm', label: '8:30pm-9:00pm' },
  { value: '9:00pm-9:30pm', label: '9:00pm-9:30pm' },
  { value: '9:30pm-10:00pm', label: '9:30pm-10:00pm' },
];

export const meetCountryOptions = [
  { value: 'germany', label: 'Germany' },
];
export const meetCityOptions = [
  { value: 'berlin', label: 'Berlin' },
  { value: 'frankfurt', label: 'Frankfurt' },
  { value: 'munich', label: 'Munich' },
  { value: 'hamburg', label: 'Hamburg' },
  { value: 'koln', label: 'Cologne (Köln)' },
  { value: 'dusseldorf', label: 'Dusseldorf' },
  { value: 'stuttgart', label: 'Stuttgart' },
  { value: 'aachen', label: 'Aachen' },
  { value: 'mannheim', label: 'Mannheim' },
  { value: 'nuremberg', label: 'Nuremberg' },
  { value: 'heidelberg', label: 'Heidelberg' },
  { value: 'darmstadt', label: 'Darmstadt' },
  { value: 'leipzig', label: 'Leipzig' },
  { value: 'bremen', label: 'Bremen' },
  { value: 'dortmund', label: 'Dortmund' },
  { value: 'hannover', label: 'Hannover' },
  { value: 'dresden', label: 'Dresden' },
  { value: 'Others', label: othersText },
];
export const nativeLanguageOptions = [
  { value: 'English', label: 'languages_english' },
  { value: 'German', label: 'languages_german' },
  { value: 'French', label: 'languages_french' },
  { value: 'Italien', label: 'languages_italien' },
  { value: 'Chinese', label: 'languages_chinese' },
  { value: 'Cantonese', label: 'languages_cantonese' },
  { value: 'Vietnamese', label: 'languages_vietnamese' },
  { value: 'Korean', label: 'languages_korean' },
  { value: 'Japanese', label: 'languages_japanese' },
  { value: 'Turkish', label: 'languages_turkish' },
  { value: 'Ukrainian', label: 'languages_ukrainian' },
  { value: 'Arabic', label: 'languages_arabic' },
  { value: 'Others', label: othersText },
];

export const languageOptions = [
  { value: 'german', label: 'German' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'vietnamese', label: 'Vietnamese' },
  { value: 'ukrainian', label: 'Ukrainian' },
  { value: 'russian', label: 'Russian' },
  { value: 'turkish', label: 'Turkish' },
  { value: 'french', label: 'French' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'kurdish', label: 'Kurdish' },
  { value: 'romani', label: 'Romani' },
  { value: 'danish', label: 'Danish' },
  { value: 'italian', label: 'Italian' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'korean', label: 'Korean' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'Others', label: othersText },
];

export const dateRangeOptions = [
  { value: 'workDay', label: 'Mon - Fri' },
  { value: 'weekend', label: 'Sat - Sun' },
];
  
export const timeRangeOptions = [
  { value: 'beforeNoon', label: 'Before 12pm (noon)' },
  { value: 'afternoon', label: '12pm - 6pm' },
  { value: 'evening', label: '6pm - 10pm' },
];

export const companySizeOptions = [
  { value: 'default', label: 'please_select_option' },
  { value: '0-100 employees', label: 'job_form_company_size_0_100' },
  { value: '100-1000 employees', label: 'job_form_company_size_100_1000' },
  { value: '1000-5000 employees', label: 'job_form_company_size_1000_5000' },
  {
    value: 'more than 5000 employees',
    label: 'job_form_company_size_more_than_5000',
  },
  { value: 'Others', label: othersText },
];

export const doYouSpeakEnglishOptions = [
  { value: 'default', label: 'please_select_option' },
  { value: 'yes', label: 'Yes, I speak English.' },
  { value: 'no', label: 'No, I do not speak English.' },
];
export const industryOptions = [
  {
    value: 'default',
    label: 'please_select_option',
  },
  {
    value: 'Medical',
    label: 'job_form_industry_medical',
  },
  {
    value: 'Software',
    label: 'job_form_industry_software',
  },
  {
    value: 'Blockchain',
    label: 'job_form_industry_blockchain',
  },
  {
    value: 'Finance',
    label: 'job_form_industry_finance',
  },
  {
    value: 'Consulting',
    label: 'job_form_industry_consulting',
  },
  { value: 'Others', label: othersText },
];

export const countryOptions = [
  { value: 'default', label: 'please_select_option' },
  { value: 'Taiwan', label: 'country_taiwan' },
  { value: 'USA', label: 'country_usa' },
  { value: 'UK', label: 'country_uk' },
  { value: 'Germany', label: 'country_germany' },
  { value: 'Austria', label: 'country_austria' },
  { value: 'Swiss', label: 'country_swiss' },
  { value: 'France', label: 'country_france' },
  { value: 'Italy', label: 'country_italy' },
  { value: 'HK', label: 'country_hk' },
  { value: 'Singapore', label: 'country_singapore' },
  { value: 'Thailand', label: 'country_thailand' },
  { value: 'Others', label: othersText },
];

export const WFHOptions = [
  { value: 'default', label: 'please_select_option' },
  { value: 'Yes, completely WFH', label: 'job_form_wfh_100_wfh' },
  {
    value: 'No, need to go to office everyday',
    label: 'job_form_wfh_0_wfh',
  },
  {
    value: 'Mostly WFH, sometimes need to go to office',
    label: 'job_form_wfh_most_wfh',
  },
  {
    value: 'Mostly on site, sometimes can WFH',
    label: 'job_form_wfh_most_office',
  },
  { value: 'Others', label: othersText },
];

export const jobOptions = [
  { value: 'default', label: 'please_select_option' },
  {
    value: 'Front-End Developer',
    label: 'job_form_job_front_end_dev',
  },
  {
    value: 'Back-End Developer',
    label: 'job_form_job_back_end_dev',
  },
  {
    value: 'Full-Stack Developer',
    label: 'job_form_job_full_stack_dev',
  },
  {
    value: 'UI/UX Designer',
    label: 'job_form_job_ui_designer',
  },

  {
    value: 'Data Analyst',
    label: 'job_form_job_data_analyst',
  },
  {
    value: 'Data Science',
    label: 'job_form_job_data_science',
  },
  {
    value: 'Blockchain Developer',
    label: 'job_form_job_block_chain_dev',
  },
  {
    value: 'Business Developer / Sales',
    label: 'job_form_job_bd_sales',
  },
  {
    value: 'Marketing',
    label: 'job_form_job_marketing',
  },
  {
    value: 'Doctor',
    label: 'job_form_job_doctor',
  },
  {
    value: 'Nurse',
    label: 'job_form_job_nurse',
  },
  {
    value: 'Investment Banker',
    label: 'job_form_job_investment_banker',
  },
  {
    value: 'Accountant / Auditor',
    label: 'job_form_job_biz_accountant',
  },
  {
    value: 'Business Consultant',
    label: 'job_form_job_biz_consultant',
  },
  {
    value: 'Others',
    label: othersText,
  },
];

export const schoolOptions = [
  { value: 'default', label: 'please_select_option' },
  {
    value: 'Business',
    label: 'uni_form_school_business',
  },
  {
    value: 'Science',
    label: 'uni_form_school_science',
  },
  { value: 'Others', label: othersText },
];

export const departmentOptions = {
  default: [{ value: 'default', label: 'please_select_option' }],
  Business: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Accounting', label: 'uni_form_department_accounting' },
    { value: 'Finance', label: 'uni_form_department_finance' },
    { value: 'Marketing', label: 'uni_form_department_marketing' },
    { value: 'Others', label: othersText },
  ],
  Science: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Chemistry', label: 'uni_form_department_chemistry' },
    {
      value: 'Computer Science',
      label: 'uni_form_department_computer_science',
    },
    {
      value: 'Computer Engineering',
      label: 'uni_form_department_computer_engineering',
    },
    { value: 'Others', label: othersText },
  ],
  Others: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Others', label: othersText },
  ],
};

export const degreeOptions = [
  { value: 'default', label: 'please_select_option' },
  { value: 'Bechelor', label: 'uni_form_bachelor' },
  { value: 'Master', label: 'uni_form_master' },
  { value: 'PhD', label: 'uni_form_phd' },
  { value: 'Others', label: othersText },
];

export const typeOptions = [
  { value: 'default', label: 'please_select_option' },
  {
    value: 'Entreprenuer',
    label: 'self_employed_type_entreprenuer',
  },
  {
    value: 'Freelancer',
    label: 'self_employed_type_freelancer',
  },
  { value: 'Others', label: othersText },
];

export const professionOptions = [
  { value: 'default', label: 'please_select_option' },
  { value: 'House Wife', label: 'self_employed_profession_housewife' },
  { value: 'House Husband', label: 'self_employed_profession_househusband' },
  {
    value: 'Content Creator',
    label: 'self_employed_profession_content_creator',
  },
  { value: 'UI/UX Designer', label: 'self_employed_profession_ui_designer' },
  { value: 'Online Shops', label: 'self_employed_profession_ui_ecommerce' },
  {
    value: 'Front-End Developer',
    label: 'self_employed_profession_frontend_dev',
  },
  {
    value: 'Back-End Developer',
    label: 'self_employed_profession_backend_dev',
  },
  {
    value: 'Full-Stack Developer',
    label: 'self_employed_profession_fullstack_dev',
  },
  {
    value: 'Blockchain Developer',
    label: 'self_employed_profession_blockchain_dev',
  },
  { value: 'Artist', label: 'self_employed_profession_artist' },
  { value: 'Musician', label: 'self_employed_profession_musician' },
  { value: 'Hair Salon', label: 'self_employed_profession_hair_salon' },
  { value: 'Nail Salon', label: 'self_employed_profession_nail_salon' },
  { value: 'Body Salon', label: 'self_employed_profession_body_salon' },
  { value: 'Massage', label: 'self_employed_profession_massage' },
  {
    value: 'Bubble Tea Shop',
    label: 'self_employed_profession_bubble_tea_shop',
  },
  { value: 'Cafe', label: 'self_employed_profession_cafe' },
  {
    value: 'Baby Sitter',
    label: 'self_employed_profession_baby_sitter',
  },
  { value: 'Teacher', label: 'self_employed_profession_teacher' },
  { value: 'Trainer', label: 'self_employed_profession_trainer' },
  {
    value: 'Business Consultant',
    label: 'self_employed_profession_consultant',
  },
  {
    value: 'Study Counselor',
    label: 'self_employed_profession_study_counselor',
  },
  {
    value: 'Career Counselor"',
    label: 'self_employed_profession_career_counselor',
  },
  {
    value: 'Psychological counselor',
    label: 'self_employed_profession_mental_counselor',
  },
  { value: 'Others', label: othersText },
];

export const yearsOptions = [
  { value: 'default', label: 'please_select_option' },
  { value: '0-1 year', label: 'job_form_experience_years_0_1' },
  { value: '1-3 years', label: 'job_form_experience_years_1_3' },
  { value: '4-6 years', label: 'job_form_experience_years_4_6' },
  { value: '7-10 years', label: 'job_form_experience_years_7_10' },
  { value: '10 years plus', label: 'job_form_experience_years_more_than_10' },
  { value: 'Others', label: othersText },
];

export const ageOptions = [
  { value: 'default', label: 'please_select_option' },
  {
    value: 'below 18 years old',
    label: 'age_under_18',
  },
  {
    value: '18-20 years old',
    label: 'age_18_to_20',
  },
  {
    value: '21-25 years old',
    label: 'age_21_to_25',
  },
  {
    value: '26-30 years old',
    label: 'age_26_to_30',
  },
  {
    value: '31-35 years old',
    label: 'age_31_to_35',
  },
  {
    value: '36-40 years old',
    label: 'age_36_to_40',
  },
  {
    value: 'over 40 years old',
    label: 'over_40',
  },
  { value: 'Others', label: othersText },
];