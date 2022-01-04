const router = require('express').Router();
const { wrapAsync } = require('../../util/util');

const {
  getHelpeeInfo,
  postHelpeeSignUpEmail,
  postHelpeeSignUpPassword,
  postHelpeeServiceRequestForm,
  testAPIConnection,
} = require('../controllers/helpeeController');

const { postHelpeeSignInData } = require('../controllers/signInController');

router.route('/api/helpee').get(wrapAsync(getHelpeeInfo));
router.route('/api/helpee-signup-email').post(wrapAsync(postHelpeeSignUpEmail));
router
  .route('/api/helpee-signup-password')
  .post(wrapAsync(postHelpeeSignUpPassword));
router
  .route('/api/helpee-request-form')
  .post(wrapAsync(postHelpeeServiceRequestForm));
router.route('/api/test').get(wrapAsync(testAPIConnection));
router.route('/api/helpee/sign-in').post(wrapAsync(postHelpeeSignInData));

module.exports = router;
