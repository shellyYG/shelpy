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
    imgPath: '/university.jpeg',
  },
  {
    value: 'job',
    label: 'service_types_job',
    imgPath: '/business.jpeg',
  },
  {
    value: 'selfEmployed',
    label: 'service_types_self_employed',
    imgPath: '/mom.jpeg',
  },
];


export const secondTypeOptions = {
  default: [{ value: 'default', label: 'please_select_option' }],
  university: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Business', label: 'uni_form_school_business' },
    { value: 'Science', label: 'uni_form_school_science' },
  ],
  job: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Medical', label: 'job_form_industry_medical' },
    { value: 'Software', label: 'job_form_industry_software' },
    { value: 'Blockchain', label: 'job_form_industry_blockchain' },
    { value: 'Finance', label: 'job_form_industry_finance' },
    { value: 'Consulting', label: 'job_form_industry_consulting' },
  ],
  selfEmployed: [
    { value: 'default', label: 'please_select_option' },
    { value: 'Entreprenuer', label: 'self_employed_type_entreprenuer' },
    { value: 'Freelancer', label: 'self_employed_type_freelancer' },
  ],
};