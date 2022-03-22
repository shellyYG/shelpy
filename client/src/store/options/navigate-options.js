export const navigateOptions = [
  {
    value: "bookHelper",
    label: "Book a Helper",
    imgPath: "/visa.jpeg",
  },
  {
    value: "viewOrderHistory",
    label: "View Order History",
    imgPath: "/anmelden.jpeg",
  },
];
export const helperAddServiceOptions = [
  {
    value: 'addOffer',
    label: 'Add Offer',
    imgPath: '/add-offer.jpeg',
  },
  {
    value: 'viewDashboard',
    label: 'View Requests',
    imgPath: '/dashboard.jpeg',
  },
];

export const jobUniOptions = [
  {
    value: 'university',
    label: 'service_types_uni',
    imgPath: '/static-imgs/university.jpeg',
  },
  {
    value: 'job',
    label: 'service_types_job',
    imgPath: '/static-imgs/business.jpeg',
  },
  {
    value: 'selfEmployed',
    label: 'service_types_self_employed',
    imgPath: '/static-imgs/mom.jpeg',
  },
];

export const jobUniWithDefaultOptions = [
  {
    value: 'default',
    label: 'please_select_option',
  },
  {
    value: 'university',
    label: 'service_types_uni',
    imgPath: '/static-imgs/university.jpeg',
  },
  {
    value: 'job',
    label: 'service_types_job',
    imgPath: '/static-imgs/business.jpeg',
  },
  {
    value: 'selfEmployed',
    label: 'service_types_self_employed',
    imgPath: '/static-imgs/mom.jpeg',
  },
];

export const secondTypeOptions = {
  default: [{ value: 'default', label: 'please_select_option' }],
  university: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Business', label: 'uni_form_school_business' },
    { value: 'Science', label: 'uni_form_school_science' },
    { value: 'Engineering', label: 'uni_form_school_engineering' },
    { value: 'SocialScience', label: 'uni_form_school_social_science' },
    { value: 'LiberalArts', label: 'uni_form_school_liberal_arts' },
    { value: 'Medicine', label: 'uni_form_school_medicine' },
    { value: 'Law', label: 'uni_form_school_law' },
  ],
  job: [
    { value: 'default', label: 'please_select_option' },
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
  ],
  selfEmployed: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Entreprenuer', label: 'self_employed_type_entreprenuer' },
    { value: 'Freelancer', label: 'self_employed_type_freelancer' },
  ],
};