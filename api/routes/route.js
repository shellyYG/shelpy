const multer = require('multer');
const router = require('express').Router();

const upload = multer();

const {
  wrapAsync,
  verifyHelpeeToken,
  verifyHelperToken,
} = require('../../util/util');

const {
  postHelpeeServiceRequestForm,
  postHelpeeRequest,
  allowHelpeePrivateRoute,
  getHelpeeAllOrders,
  getHelpeeOrderHelperList,
} = require('../controllers/helpeeController');

const {
  postHelperRequest,
  allowHelperPrivateRoute,
  getHelperAllMatchedRequests,
} = require('../controllers/helperController');

const { postUserSignInData } = require('../controllers/signInController');
const { postUserSignUpData } = require('../controllers/signUpController');

router
  .route('/api/helpee/get-auth-status')
  .post(verifyHelpeeToken, wrapAsync(allowHelpeePrivateRoute));
router.route('/api/helpee/signup-password').post(wrapAsync(postUserSignUpData));

// old:
router
  .route('/api/helpee/request-form')
  .post(wrapAsync(postHelpeeServiceRequestForm));
// new:
router.route('/api/helpee/request').post(wrapAsync(postHelpeeRequest));

router.route('/api/helpee/all-orders').get(wrapAsync(getHelpeeAllOrders));
router.route('/api/helpee/sign-in').post(wrapAsync(postUserSignInData));
router
  .route('/api/helpee/helper-list')
  .get(wrapAsync(getHelpeeOrderHelperList));

router
  .route('/api/helper/get-auth-status')
  .post(verifyHelperToken, wrapAsync(allowHelperPrivateRoute));
router.route('/api/helper/signup-password').post(wrapAsync(postUserSignUpData));

router.route('/api/helper/request').post(wrapAsync(postHelperRequest));

router
  .route('/api/helper/matched-requests')
  .get(wrapAsync(getHelperAllMatchedRequests));
router.route('/api/helper/sign-in').post(wrapAsync(postUserSignInData));

router.post(
  '/api/helper/basic-form-upload',
  upload.array('certificate', 3),
  function (req, res, next) { // eslint-disable-line
    console.log('req.body: ', req.body);
    console.log('req.files: ', req.files); // YES works
  }
);

module.exports = router;
