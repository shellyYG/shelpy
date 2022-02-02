const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const util = require('util');

const { uploadFile, getFileStream } = require('../../util/s3');

const {
  wrapAsync,
  verifyHelpeeToken,
  verifyHelperToken,
} = require('../../util/util');

const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}`);
  },
});
const upload = multer({ storage });

const unlinkFile = util.promisify(fs.unlink);

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
  getProfilePic,
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

router
  .route('/images/:key(*)')
  .get(wrapAsync(getProfilePic));

router.post(
  '/api/helper/profile-pic-upload',
  upload.array('profilePic', 3),
  async (req, res, next) => {
    const file = req.files[0];
    const result = await uploadFile(file, 'user-profile-pictures');
    await unlinkFile(file.path);
    res.send({ imagePath: `/images/${result.Key}`})
  }
);

module.exports = router;
