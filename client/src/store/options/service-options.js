const othersText = 'Others (Please specify in the Notes below)';
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
  { value: '7am-8am', label: '7am-8am' },
  { value: '8am-9am', label: '8am-9am' },
  { value: '9am-10am', label: '9am-10am' },
  { value: '10am-11am', label: '10am-11am' },
  { value: '11am-12pm', label: '11am-12pm (afternoon)' },
  { value: '1pm-2pm', label: '1pm-2pm' },
  { value: '2pm-3pm', label: '2pm-3pm' },
  { value: '3pm-4pm', label: '3pm-4pm' },
  { value: '4pm-5pm', label: '4pm-5pm' },
  { value: '5pm-6pm', label: '5pm-6pm' },
  { value: '6pm-7pm', label: '6pm-7pm' },
  { value: '7pm-8pm', label: '7pm-8pm' },
  { value: '8pm-9pm', label: '8mp-9pm' },
  { value: '9pm-10pm', label: '9pm-10pm' },
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
  { value: 'default', label: 'Please Select' },
  { value: '0-100 employees', label: '0-100 employees' },
  { value: '100-1000 employees', label: '100-1000 employees' },
  { value: '1000-5000 employees', label: '1000-5000 employees' },
  { value: 'more than 5000 employees', label: '5000+ employees' },
  { value: 'Others', label: othersText },
];

export const doYouSpeakEnglishOptions = [
  { value: 'default', label: 'Please Select' },
  { value: 'yes', label: 'Yes, I speak English.' },
  { value: 'no', label: 'No, I do not speak English.' },
];
export const industryOptions = [
  {
    value: 'default',
    label: 'Please Select',
  },
  {
    value: 'Medical',
    label: 'Medical',
  },
  {
    value: 'Software',
    label: 'Software',
  },
  {
    value: 'Blockchain',
    label: 'Blockchain',
  },
  {
    value: 'Finance',
    label: 'Finance',
  },
  {
    value: 'Consulting',
    label: 'Consulting',
  },
  { value: 'Others', label: othersText },
];

export const countryOptions = [
  { value: 'default', label: 'Please Select' },
  { value: 'Taiwan', label: 'Taiwan' },
  { value: 'USA', label: 'USA' },
  { value: 'UK', label: 'UK' },
  { value: 'Germany', label: 'Germany' },
  { value: 'France', label: 'France' },
  { value: 'Italy', label: 'Italy' },
  { value: 'HK', label: 'HK' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Thailand', label: 'Thailand' },
  { value: 'Others', label: othersText },
];

export const WFHOptions = [
  { value: 'default', label: 'Please Select' },
  { value: 'fullyWFH', label: 'Yes, completely WFH' },
  { value: 'fullyOnSite', label: 'No, need to go to office everyday' },
  { value: 'moreWFH', label: 'Mostly WFH, sometimes need to go to office' },
  { value: 'moreOnSite', label: 'Mostly on site, sometimes can WFH' },
  { value: 'Others', label: othersText },
];

export const jobOptions = [
  { value: 'default', label: 'Please Select' },
  {
    value: 'Front-End Developer',
    label: 'Front-End Developer',
  },
  {
    value: 'Back-End Developer',
    label: 'Back-End Developer',
  },
  {
    value: 'UI/UX Designer',
    label: 'UI/UX Designer',
  },
  {
    value: 'Full-Stack Developer',
    label: 'Full-Stack Developer',
  },
  {
    value: 'Data Analyst',
    label: 'Data Analyst',
  },
  {
    value: 'Data Science',
    label: 'Data Science',
  },
  {
    value: 'Blockchain Developer',
    label: 'Blockchain Developer',
  },
  {
    value: 'Business Developer',
    label: 'Business Developer',
  },
  {
    value: 'Sales',
    label: 'Sales',
  },
  {
    value: 'Marketing',
    label: 'Marketing',
  },
  {
    value: 'Doctor',
    label: 'Doctor',
  },
  {
    value: 'Nurse',
    label: 'Nurse',
  },
  {
    value: 'Investment Banker',
    label: 'Investment Banker',
  },
  {
    value: 'Accountant',
    label: 'Accountant',
  },
  {
    value: 'Auditor',
    label: 'Auditor',
  },
  {
    value: 'Consultant',
    label: 'Consultant',
  },
  {
    value: 'Others',
    label: othersText,
  },
];

export const schoolOptions = [
  { value: 'default', label: 'Please Select' },
  {
    value: 'Business',
    label: 'Business',
  },
  {
    value: 'Science',
    label: 'Science',
  },
  { value: 'Others', label: othersText },
];

export const departmentOptions = {
  default: [{ value: 'default', label: 'Please Select' }],
  Business: [
    { value: 'default', label: 'Please Select' },
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Others', label: othersText },
  ],
  Science: [
    { value: 'default', label: 'Please Select' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Computer Engineering', label: 'Computer Engineering' },
    { value: 'Others', label: othersText },
  ],
  Others: [{ value: 'Others', label: othersText }],
};
;

export const degreeOptions = [
  { value: 'default', label: 'Please Select' },
  { value: 'Bechelor', label: 'Bechelor (Undergraduate)' },
  { value: 'Master', label: 'Master (Post-Graduate)' },
  { value: 'PhD', label: 'PhD (Doctor)' },
  { value: 'Others', label: othersText },
];

export const typeOptions = [
  { value: 'default', label: 'Please Select' },
  {
    value: 'Entreprenuer',
    label: 'Entreprenuer (Has other people working for you)',
  },
  { value: 'House Wife', label: 'House Wife' },
  { value: 'House Husband', label: 'House Husband' },
  {
    value: 'Freelancer',
    label: 'Freelancer (Only you are working for yourself)',
  },
  { value: 'Others', label: othersText },
];

export const professionOptions = [
  { value: 'default', label: 'Please Select' },
  { value: 'House Wife', label: 'House Wife' },
  { value: 'Content Creator', label: 'Content Creator (Youtuber, IG...etc.)' },
  { value: 'UI/UX Designer', label: 'UI/UX Designer' },
  { value: 'Online Shops', label: 'Online Shops' },
  { value: 'Software Developer', label: 'Software Developer' },
  { value: 'Artist', label: 'Artist' },
  { value: 'Musician', label: 'Musician' },
  { value: 'Hair Salon', label: 'Hair Salon' },
  { value: 'Nail Salon', label: 'Nail Salon' },
  { value: 'Body Salon', label: 'Body Salon' },
  { value: 'Baby Sitter', label: 'Babysitter' },
  { value: 'Massage', label: 'Massage' },
  { value: 'Teacher', label: 'Teacher' },
  { value: 'Trainer', label: 'Trainer' },
  { value: 'Consultant', label: 'Consultant' },
  { value: 'Others', label: othersText },
];

export const yearsOptions = [
  { value: 'default', label: 'Please Select' },
  { value: '0-1 year', label: '0-1 Year' },
  { value: '1-3 years', label: '1-3 Years' },
  { value: '3-6 years', label: '3-6 Years' },
  { value: '6-10 years', label: '6-10 Years' },
  { value: '10 years plus', label: '> 10 Years' },
  { value: 'Others', label: othersText },
];

export const ageOptions = [
  { value: 'default', label: 'Please Select' },
  {
    value: '16-20 years old',
    label: '16-20 years old',
  },
  {
    value: '21-25 years old',
    label: '21-25 years old',
  },
  {
    value: '26-30 years old',
    label: '26-30 years old',
  },
  {
    value: '31-35 years old',
    label: '31-35 years old',
  },
  {
    value: '36-40 years old',
    label: '36-40 years old',
  },
  {
    value: 'over 40 years old',
    label: 'over 40 years old',
  },
  { value: 'Others', label: othersText },
];