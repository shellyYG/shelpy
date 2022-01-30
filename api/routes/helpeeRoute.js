const router = require('express').Router();
const { wrapAsync, verifyToken } = require('../../util/util');

const {
  postHelpeeServiceRequestForm,
  postHelpeeRequest,
  allowPrivateRoute,
  getAllOrders,
  getHelperList,
} = require('../controllers/helpeeController');

const { postHelpeeSignInData } = require('../controllers/signInController');
const { postSignUpData } = require('../controllers/signUpController');


router
  .route('/api/get-auth-status')
  .post(verifyToken, wrapAsync(allowPrivateRoute));
router.route('/api/helpee-signup-password').post(wrapAsync(postSignUpData));

// old:
router.route('/api/helpee-request-form').post(wrapAsync(postHelpeeServiceRequestForm));
// new:
router
  .route('/api/helpee-request')
  .post(wrapAsync(postHelpeeRequest));

router.route('/api/all-orders').get(wrapAsync(getAllOrders));
router.route('/api/helpee/sign-in').post(wrapAsync(postHelpeeSignInData));
router.route('/api/helper-list').get(wrapAsync(getHelperList));

module.exports = router;
