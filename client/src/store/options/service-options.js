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
  { value: '7:00am', label: '7:00am' },
  { value: '7:30am', label: '7:30am' },
  { value: '8:00am', label: '8:00am' },
  { value: '8:30am', label: '8:30am' },
  { value: '9:00am', label: '9:00am' },
  { value: '9:30am', label: '9:30am' },
  { value: '10:00am', label: '10:00am' },
  { value: '10:30am', label: '10:30am' },
  { value: '11:00am', label: '11:00am' },
  { value: '11:30am', label: '11:30am' },
  { value: '12:00pm', label: '12:00pm' },
  { value: '12:30pm', label: '12:30pm' },
  { value: '1:00pm', label: '1:00pm' },
  { value: '1:30pm', label: '1:30pm' },
  { value: '2:00pm', label: '2:00pm' },
  { value: '2:30pm', label: '2:30pm' },
  { value: '3:00pm', label: '3:00pm' },
  { value: '3:30pm', label: '3:30pm' },
  { value: '4:00pm', label: '4:00pm' },
  { value: '4:30pm', label: '4:30pm' },
  { value: '5:00pm', label: '5:00pm' },
  { value: '5:30pm', label: '5:30pm' },
  { value: '6:00pm', label: '6:00pm' },
  { value: '6:30pm', label: '6:30pm' },
  { value: '7:00pm', label: '7:00pm' },
  { value: '7:30pm', label: '7:30pm' },
  { value: '8:00pm', label: '8:00pm' },
  { value: '8:30pm', label: '8:30pm' },
  { value: '9:00pm', label: '9:00pm' },
  { value: '9:30pm', label: '9:30pm' },
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
    value: 'Finance',
    label: 'job_form_industry_finance',
  },
  {
    value: 'Retail',
    label: 'job_form_industry_retail',
  },
  {
    value: 'Manufacture',
    label: 'job_form_manufacture',
  },
  {
    value: 'Consulting',
    label: 'job_form_industry_consulting',
  },
  {
    value: 'Software/Ecommerce',
    label: 'job_form_information_technology_ecommerce',
  },
  {
    value: 'Travel/Tourism/Food',
    label: 'job_form_industry_tourisum',
  },
  {
    value: 'Law',
    label: 'job_form_industry_law',
  },
  {
    value: 'Social/Public Service',
    label: 'job_form_industry_social_service',
  },
  {
    value: 'Education/Trainer',
    label: 'job_form_industry_education',
  },
  {
    value: 'Media/Design/Art',
    label: 'job_form_industry_media_art',
  },
  {
    value: 'Agency',
    label: 'job_form_industry_agency',
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

export const jobOptions = {
  default: [{ value: 'default', label: 'please_select_option' }],
  Medical: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Doctor', label: 'job_form_job_doctor' },
    { value: 'Nurse', label: 'job_form_job_nurse' },
    { value: 'Pharmacist', label: 'job_form_job_pharmacist' },
    { value: 'Veterinary', label: 'job_form_job_veterinary' },
    {
      value: 'Psychological counselor',
      label: 'job_form_job_mental_counselor',
    },
    {
      value: 'Dietitian',
      label: 'job_form_job_dietitian',
    },
    {
      value: 'Dentist',
      label: 'job_form_job_dentist',
    },
    {
      value: 'Occupational Therapist',
      label: 'job_form_job_occupational_therapist',
    },
    {
      value: 'Physical Therapist',
      label: 'job_form_job_physical_therapist',
    },
    {
      value: 'Speech Therapist',
      label: 'job_form_job_speech_therapist',
    },
    {
      value: 'Hearing Therapist',
      label: 'job_form_job_hearing_therapist',
    },
    {
      value: 'Radiologist',
      label: 'job_form_job_radiologist',
    },
    { value: 'Others', label: othersText },
  ],
  Finance: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Investment Banker', label: 'job_form_job_investment_banker' },
    { value: 'Sales & Trading', label: 'job_form_job_trading' },
    { value: 'Asset Management', label: 'job_form_job_asset_management' },
    { value: 'Private Equity', label: 'job_form_job_PE' },
    { value: 'Bank Teller', label: 'job_form_job_bank_teller' },
    { value: 'Insurance Sales', label: 'job_form_job_insurance_sales' },
    { value: 'Stock Broker', label: 'job_form_job_stock_broker' },
    {
      value: 'Personal Investment Advisor',
      label: 'job_form_job_investment_advisor',
    },
    { value: 'Industry Analyst', label: 'job_form_job_industry_analyst' },
    { value: 'Accountant', label: 'job_form_job_accountant' },
    { value: 'Auditor', label: 'job_form_job_auditor' },
    { value: 'Others', label: othersText },
  ],
  Retail: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Cashier', label: 'job_form_job_cashier' },
    { value: 'Finance Analyst/Manager', label: 'job_form_job_retail_finance' },
    { value: 'Sales Analyst/Manager', label: 'job_form_job_retail_sales' },
    { value: 'Marketing Analyst/Manager', label: 'job_form_job_retail_mkt' },
    { value: 'Purchase', label: 'job_form_job_retail_purchase' },
    { value: 'Engineer/IT', label: 'job_form_job_retail_IT' },
    { value: 'Human Resource', label: 'job_form_job_retail_hr' },
    { value: 'Public Relations', label: 'job_form_job_retail_pr' },
    { value: 'Others', label: othersText },
  ],
  Manufacture: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Labor Worker', label: 'job_form_job_manufacture_worker' },
    {
      value: 'Business Development/B2B Sales',
      label: 'job_form_job_manufacture_bd',
    },
    {
      value: 'Finance Analyst/Manager',
      label: 'job_form_job_manufacture_finance',
    },
    {
      value: 'Sales Analyst/Manager',
      label: 'job_form_job_manufacture_sales',
    },
    {
      value: 'Marketing Analyst/Manager',
      label: 'job_form_job_manufacture_mkt',
    },
    {
      value: 'Purchase',
      label: 'job_form_job_manufacture_purchase',
    },
    {
      value: 'Engineer/IT',
      label: 'job_form_job_manufacture_IT',
    },
    {
      value: 'Mechanical Engineer',
      label: 'job_form_job_mechanical_engineer',
    },
    {
      value: 'Process Engineer',
      label: 'job_form_job_process_engineer',
    },
    {
      value: 'Equipment Engineer',
      label: 'job_form_job_equipment_engineer',
    },
    {
      value: 'Field Application Engineer (FAE)',
      label: 'job_form_job_fae',
    },
    {
      value: 'Nano R&D Engineer',
      label: 'job_form_job_nano_engineer',
    },
    {
      value: 'Biotechnology Engineer',
      label: 'job_form_job_biotechnology_engineer',
    },
    {
      value: 'Material Engineer',
      label: 'job_form_job_material_engineer',
    },
    {
      value: 'Human Resource',
      label: 'job_form_job_manufacture_hr',
    },
    {
      value: 'Public Relations',
      label: 'job_form_job_manufacture_pr',
    },
    {
      value: 'Receptionist',
      label: 'job_form_job_manufatcure_receptionist',
    },
    { value: 'Others', label: othersText },
  ],
  Consulting: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Strategy Consultant', label: 'job_form_job_strategy_consultant' },
    { value: 'IT Consultant', label: 'job_form_job_IT_consultant' },
    { value: 'Finance Consultant', label: 'job_form_job_finance_consultant' },
    { value: 'Tax Consultant', label: 'job_form_job_tax_consultant' },
    { value: 'Human Resource', label: 'job_form_job_hr' },
    { value: 'Receptionist', label: 'job_form_job_consulting_receptionist' },
    { value: 'Others', label: othersText },
  ],
  'Software/Ecommerce': [
    { value: 'default', label: 'please_select_option' },
    { value: 'Back-End Developer', label: 'job_form_job_backend_developer' },
    { value: 'Front-End Developer', label: 'job_form_job_frontend_developer' },
    {
      value: 'Full-Stack Developer',
      label: 'job_form_job_fullstack_developer',
    },
    {
      value: 'DevOps',
      label: 'job_form_job_dev_ops',
    },
    {
      value: 'QA Developer',
      label: 'job_form_job_qa_developer',
    },
    {
      value: 'Blockchain Developer',
      label: 'job_form_job_blockchain_developer',
    },
    {
      value: 'Product Manager',
      label: 'job_form_job_product_manager',
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
      value: 'Business Developer/Sales',
      label: 'job_form_job_bd_sales',
    },
    {
      value: 'Marketing',
      label: 'job_form_job_marketing',
    },
    {
      value: 'Graphic Designer',
      label: 'job_form_job_graphic_designer',
    },
    {
      value: 'Purchase',
      label: 'job_form_job_ecommerce_purchase',
    },
    {
      value: 'Logistics/Supply Chain',
      label: 'job_form_job_ecommerce_logistic',
    },
    {
      value: 'Human Resource',
      label: 'job_form_job_ecommerce_hr',
    },
    {
      value: 'Public Relations',
      label: 'job_form_job_ecommerce_pr',
    },
    {
      value: 'Copy Writter',
      label: 'job_form_job_ecommerce_copywritter',
    },
    {
      value: 'Receptionist',
      label: 'job_form_job_ecommerce_receptionist',
    },
    { value: 'Others', label: othersText },
  ],
  'Travel/Tourism/Food': [
    { value: 'default', label: 'please_select_option' },
    { value: 'Tour Guide', label: 'job_form_job_tour_guide' },
    { value: 'Waiter/Waitress', label: 'job_form_job_waiter' },
    { value: 'Receptionist', label: 'job_form_job_tourisum_receptionist' },
    { value: 'Chef/Cooker', label: 'job_form_job_cooker' },
    { value: 'Bartender', label: 'job_form_job_bartender' },
    { value: 'Driver', label: 'job_form_job_driver' },
    { value: 'Pilot', label: 'job_form_job_pilot' },
    { value: 'Flight attendants', label: 'job_form_job_flight_attendent' },
    { value: 'Others', label: othersText },
  ],
  Law: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Lawyer', label: 'job_form_job_lawyer' },
    { value: 'Judge', label: 'job_form_job_judge' },
    { value: 'Prosecutor', label: 'job_form_job_prosecutor' },
    { value: 'Others', label: othersText },
  ],
  'Social/Public Service': [
    { value: 'default', label: 'please_select_option' },
    { value: 'Police', label: 'job_form_job_police' },
    { value: 'Fire Fighter', label: 'job_form_job_fire_fighter' },
    { value: 'Babysitter', label: 'job_form_job_babysitter' },
    { value: 'Social Worker', label: 'job_form_social_worker' },
    { value: 'Others', label: othersText },
  ],
  'Education/Trainer': [
    { value: 'default', label: 'please_select_option' },
    { value: 'Professor', label: 'job_form_job_professor' },
    { value: 'Teacher', label: 'job_form_job_teacher' },
    { value: 'Sport Trainer', label: 'job_form_job_sport_trainer' },
    {
      value: 'Career Trainer/Counselor',
      label: 'job_form_job_career_counselor',
    },
    { value: 'Others', label: othersText },
  ],
  'Media/Design/Art': [
    { value: 'default', label: 'please_select_option' },
    { value: 'Actor/Actress', label: 'job_form_job_actor' },
    {
      value: 'Content Creator (Youtuber,IG...)',
      label: 'job_form_job_content_creator',
    },
    {
      value: 'Photographer',
      label: 'job_form_job_photographer',
    },
    {
      value: 'Wedding Planner/Bride Makeup Artist',
      label: 'job_form_job_wedding_planner',
    },
    {
      value: 'Apparel Designer',
      label: 'job_form_job_apparel_designer',
    },
    {
      value: 'Industrial Designer',
      label: 'job_form_job_industry_designer',
    },
    {
      value: 'Multimedia/ Animation Designer',
      label: 'job_form_job_multimedia_designer',
    },
    {
      value: 'Graphic Designer',
      label: 'job_form_job_art_graphic_designer',
    },
    {
      value: 'Interior Designer',
      label: 'job_form_job_art_interior_designer',
    },
    {
      value: 'Musician',
      label: 'job_form_job_musician',
    },
    {
      value: 'Painter',
      label: 'job_form_job_painter',
    },
    {
      value: 'Flower Artist',
      label: 'job_form_job_flower_artist',
    },
    {
      value: 'Hair Stylist',
      label: 'job_form_hair_stylist',
    },
    {
      value: 'Massager',
      label: 'job_form_massager',
    },
    { value: 'Others', label: othersText },
  ],
  Agency: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Real Estate Agency', label: 'job_form_job_real_estate_agency' },
    { value: 'Human Resource Agency', label: 'job_form_job_hr_agency' },
    { value: 'Others', label: othersText },
  ],
  Others: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Others', label: othersText },
  ],
};

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
  {
    value: 'SocialScience',
    label: 'uni_form_school_social_science',
  },
  {
    value: 'Medicine',
    label: 'uni_form_school_medicine',
  },
  {
    value: 'Engineering',
    label: 'uni_form_school_engineering',
  },
  {
    value: 'Law',
    label: 'uni_form_school_law',
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
    {
      value: 'InternationalBusiness',
      label: 'uni_form_department_international_business',
    },
    {
      value: 'InformationManagement',
      label: 'uni_form_department_information_management',
    },
    {
      value: 'BusinessAdministration',
      label: 'uni_form_department_business_administration',
    },
    { value: 'Others', label: othersText },
  ],
  Science: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Mathematics', label: 'uni_form_department_mathematics' },
    { value: 'Physics', label: 'uni_form_department_physics' },
    { value: 'Chemistry', label: 'uni_form_department_chemistry' },
    { value: 'Geosciences', label: 'uni_form_department_geosciences' },
    {
      value: 'AtmosphericSciences',
      label: 'uni_form_department_atmospheric_sciences',
    },
    {
      value: 'Oceanography',
      label: 'uni_form_department_oceanography',
    },
    {
      value: 'Astrophsics',
      label: 'uni_form_department_Astrophsics',
    },
    { value: 'Others', label: othersText },
  ],
  SocialScience: [
    { value: 'default', label: 'please_select_option' },
    {
      value: 'PoliticalScience',
      label: 'uni_form_department_political_science',
    },
    {
      value: 'Economics',
      label: 'uni_form_department_economics',
    },
    {
      value: 'Socialogy',
      label: 'uni_form_department_sociology',
    },
    { value: 'Others', label: othersText },
  ],
  Medicine: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Medicine', label: 'uni_form_department_medicine' },
    { value: 'Nursing', label: 'uni_form_department_nursing' },
    {
      value: 'Clinical Laboratory Science & Medical Biotech',
      label: 'uni_form_department_clinical_laboratory',
    },
    {
      value: 'Physical Therapy',
      label: 'uni_form_department_physical_therapy',
    },
    {
      value: 'Occupation Therapy',
      label: 'uni_form_department_occupation_therapy',
    },
    {
      value: 'Clinical Medicine',
      label: 'uni_form_department_clinical_medicine',
    },
    {
      value: 'Toxicology',
      label: 'uni_form_department_clinical_toxicology',
    },
    {
      value: 'Molecular Medicine',
      label: 'uni_form_department_clinical_molecular_medicine',
    },
    {
      value: 'Immunology',
      label: 'uni_form_department_clinical_immunology',
    },
    {
      value: 'Oncology',
      label: 'uni_form_department_clinical_oncology',
    },
    {
      value: 'Medical Genomics & Proteomics',
      label: 'uni_form_department_clinical_medical_genomics',
    },
    {
      value: 'Brain & Mind Sciences',
      label: 'uni_form_department_clinical_brain_mind_science',
    },
    {
      value: 'Medical Device & Imaging',
      label: 'uni_form_department_medical_device_imaging',
    },
    {
      value: 'Anatomy & Cell Biology',
      label: 'uni_form_department_anotomy_cell_biology',
    },
    {
      value: 'Biochemistry',
      label: 'uni_form_department_biochemistry',
    },
    {
      value: 'Physiology',
      label: 'uni_form_department_physiology',
    },
    {
      value: 'Microbiology',
      label: 'uni_form_department_micobiology',
    },
    {
      value: 'Pharmacology',
      label: 'uni_form_department_pharmacology',
    },
    {
      value: 'Pathology',
      label: 'uni_form_department_pathology',
    },
    {
      value: 'Dentistry',
      label: 'uni_form_department_dentistry',
    },
    { value: 'Others', label: othersText },
  ],
  Engineering: [
    { value: 'default', label: 'please_select_option' },
    {
      value: 'Electrical Engineering',
      label: 'uni_form_department_electrical_engineering',
    },
    {
      value: 'Computer Science & Information Engineering',
      label: 'uni_form_department_computer_science_and_info_engineering',
    },
    {
      value: 'Data Science',
      label: 'uni_form_department_data_science',
    },
    {
      value: 'Civic Engineering',
      label: 'uni_form_department_civic_engineering',
    },
    {
      value: 'Mechanical Engineering',
      label: 'uni_form_department_mechanical_engineering',
    },
    {
      value: 'Chemical Engineering',
      label: 'uni_form_department_chemical_engineering',
    },
    {
      value: 'Ocean Engineering',
      label: 'uni_form_department_ocean_engineering',
    },
    {
      value: 'Materials Science & Engineering',
      label: 'uni_form_department_materials_science',
    },
    {
      value: 'Biomedical Engineering',
      label: 'uni_form_department_biomedical_engineering',
    },
    {
      value: 'Environmental Engineering',
      label: 'uni_form_department_environmental_engineering',
    },
    {
      value: 'Photonices & Optoelectronics',
      label: 'uni_form_department_photonics_opetoelectronics',
    },
    { value: 'Others', label: othersText },
  ],
  Law: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Civic Law', label: 'uni_form_department_civic_law' },
    {
      value: 'Criminal Justice',
      label: 'uni_form_department_criminal_justice',
    },
    { value: 'Commercial Law', label: 'uni_form_department_commercial_law' },
    { value: 'Public Law', label: 'uni_form_department_public_law' },
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
    value: 'Bubble Tea Shop Waiter/Waitress',
    label: 'self_employed_profession_bubble_tea_shop',
  },
  { value: 'Cafe Waiter/Waitress', label: 'self_employed_profession_cafe' },
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
  {
    value: 'Tattoo Artist',
    label: 'self_employed_profession_job_tattoo_artist',
  },
  {
    value: 'Photographer',
    label: 'self_employed_profession_photographer',
  },
  {
    value: 'Wedding Planner/Bride Makeup Artist',
    label: 'self_employed_profession_wedding_planner',
  },
  {
    value: 'Apparel Designer',
    label: 'self_employed_profession_apparel_designer',
  },
  {
    value: 'Industrial Designer',
    label: 'self_employed_profession_industry_designer',
  },
  {
    value: 'Multimedia/ Animation Designer',
    label: 'self_employed_profession_multimedia_designer',
  },
  {
    value: 'Graphic Designer',
    label: 'self_employed_profession_art_graphic_designer',
  },
  {
    value: 'Interior Designer',
    label: 'self_employed_profession_interior_designer',
  },
  {
    value: 'Flower Artist',
    label: 'self_employed_profession_flower_artist',
  },
  {
    value: 'Birth Consultant',
    label: 'self_employed_profession_birth_consultant',
  },
  {
    value: 'Farmer',
    label: 'self_employed_profession_farmer',
  },
  {
    value: 'Delivery Man/Woman',
    label: 'self_employed_profession_delivery_person',
  },
  {
    value: 'Cafe Owner',
    label: 'self_employed_profession_cafe_owner',
  },
  {
    value: 'Airbnb/Inn/Hostel Owner',
    label: 'self_employed_profession_bb_owner',
  },
  {
    value: 'Restaurant Owner',
    label: 'self_employed_profession_restaurant_owner',
  },
  {
    value: 'Caretaker',
    label: 'self_employed_profession_caretaker',
  },
  {
    value: 'Cleaner',
    label: 'self_employed_profession_cleaner',
  },
  {
    value: 'Body Guard',
    label: 'self_employed_profession_body_guard',
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

export const durationOptions = [
  { value: 'default', label: 'please_select_option' },
  { value: '25 minutes', label: 'duration_25m' },
  { value: '30 minutes', label: 'duration_30m' },
  { value: '35 minutes', label: 'duration_35m' },
  { value: '40 minutes', label: 'duration_40m' },
  { value: '45 minutes', label: 'duration_45m' },
  { value: '50 minutes', label: 'duration_50m' },
  { value: '55 minutes', label: 'duration_55m' },
  { value: '60 minutes', label: 'duration_60m' },
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