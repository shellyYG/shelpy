const router = require('express').Router();
const { wrapAsync, verifyToken } = require('../../util/util');

const {
  postHelpeeServiceRequestForm,
  allowPrivateRoute,
  getAllOrders,
} = require('../controllers/helpeeController');

const { postHelpeeSignInData } = require('../controllers/signInController');
const { postSignUpData } = require('../controllers/signUpController');


router
  .route('/api/get-auth-status')
  .post(verifyToken, wrapAsync(allowPrivateRoute));
router.route('/api/helpee-signup-password').post(wrapAsync(postSignUpData));
router.route('/api/helpee-request-form').post(wrapAsync(postHelpeeServiceRequestForm));
router.route('/api/all-orders').get(wrapAsync(getAllOrders));
router.route('/api/helpee/sign-in').post(wrapAsync(postHelpeeSignInData));

module.exports = router;
