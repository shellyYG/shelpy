const router = require('express').Router();
const { wrapAsync } = require('../../util/util');

const {
  getHelpeeInfo,
  postHelpeeSignUpEmail,
  postHelpeeSignUpPassword,
  testAPIConnection,
} = require('../controllers/helpeeController');

router.route("/api/helpee").get(wrapAsync(getHelpeeInfo));
router.route("/api/helpee-signup-email").post(wrapAsync(postHelpeeSignUpEmail));
router.route("/api/helpee-signup-password").post(wrapAsync(postHelpeeSignUpPassword));
router.route("/api/test").get(wrapAsync(testAPIConnection));

module.exports = router;