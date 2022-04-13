const viewSingleOfferPage = (providerId, offerId) => {
  window.fbq('trackCustom', 'ViewOffer', { providerId, offerId });
};

const clickOnBookHelper = (providerId, offerId) => {
  window.fbq('trackCustom', 'BookHelper', { providerId, offerId });
};

const clickOnToHomePage = (providerId, offerId) => {
  window.fbq('trackCustom', 'ToHome', { providerId, offerId });
};

const signUpOnSingleOffer = (providerId, offerId) => {
  window.fbq('trackCustom', 'SignUpSOP', { providerId, offerId });
};

const signInOnSingleOffer = (providerId, offerId) => {
  window.fbq('trackCustom', 'SignInSOP', { providerId, offerId });
};

const signUpOnHelpeeHomePage = (providerId, offerId) => {
  window.fbq('trackCustom', 'SignUpHelpeeHome', { providerId, offerId });
};

const signUpOnHelperHomePage = (providerId, offerId) => {
  window.fbq('trackCustom', 'SignUpHelperHome', { providerId, offerId });
};

module.exports = {
  viewSingleOfferPage,
  clickOnBookHelper,
  clickOnToHomePage,
  signUpOnSingleOffer,
  signInOnSingleOffer,
  signUpOnHelpeeHomePage,
  signUpOnHelperHomePage,
};
