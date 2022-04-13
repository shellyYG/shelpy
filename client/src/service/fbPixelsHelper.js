const viewSingleOfferPage = (helperId, offerId) => {
  window.fbq('track', 'View-Single-Offer', { helperId, offerId } );
};

const clickOnBookHelper = () => {
  window.fbq('track', 'Book-Helper');
};

const clickOnToHomePage = () => {
  window.fbq('track', 'Book-Helper');
};

const signUpOnSingleOffer = () => {
  window.fbq('track', 'Sign-Up-On-Single-Offer-Page');
};

const signInOnSingleOffer = () => {
  window.fbq('track', 'Sign-In-On-Single-Offer-Page');
};

const signUpOnHomePage = () => {
  window.fbq('track', 'Sign-Up-On-Home-Page');
};

module.exports = {
  viewSingleOfferPage,
  clickOnBookHelper,
  clickOnToHomePage,
  signUpOnSingleOffer,
  signInOnSingleOffer,
  signUpOnHomePage,
};
