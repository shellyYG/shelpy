const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const util = require('util');

const { uploadFile } = require('../../util/s3');
const helperModel = require('../models/helperModel');
const helpeeModel = require('../models/helpeeModel');

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
    cb(null, `${Date.now()}-${file.originalname}`);
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
  postHelperOffer,
  deleteHelperOffer,
  allowHelperPrivateRoute,
  getHelperAllMatchedRequests,
  getProfilePic,
  getHelperAllOffers,
} = require('../controllers/helperController');

const { postUserSignInData } = require('../controllers/signInController');
const { postUserSignUpData } = require('../controllers/signUpController');

router
  .route('/api/helpee/get-auth-status')
  .post(verifyHelpeeToken, wrapAsync(allowHelpeePrivateRoute));
router
  .route('/api/helper/get-auth-status')
  .post(verifyHelperToken, wrapAsync(allowHelperPrivateRoute));

router.route('/api/helpee/signup-password').post(wrapAsync(postUserSignUpData));

// old:
router
  .route('/api/helpee/request-form')
  .post(wrapAsync(postHelpeeServiceRequestForm));
// new:
router.route('/api/helpee/request').post(wrapAsync(postHelpeeRequest));
router.route('/api/helper/offer').post(wrapAsync(postHelperOffer));
router.route('/api/helper/offer').delete(wrapAsync(deleteHelperOffer));

router.route('/api/helpee/all-orders').get(wrapAsync(getHelpeeAllOrders));
router.route('/api/helper/all-offers').get(wrapAsync(getHelperAllOffers));;
router.route('/api/helpee/sign-in').post(wrapAsync(postUserSignInData));
router
  .route('/api/helpee/helper-list')
  .get(wrapAsync(getHelpeeOrderHelperList));

router.route('/api/helper/signup-password').post(wrapAsync(postUserSignUpData));

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
    const { helperUserId } = req.body;
    const file = req.files[0];
    try {
      const result = await uploadFile(file, 'helper-profile-pictures');
      await helperModel.updateHelperProfilePicPath({ userId: helperUserId, path: result.Key});
      await unlinkFile(file.path);
      res.status(200).send({ imagePath: `/images/${result.Key}` });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);
router.post(
  '/api/helpee/profile-pic-upload',
  upload.array('profilePic', 3),
  async (req, res, next) => {
    const { helpeeUserId } = req.body;
    console.log('@api helpeeUserId: ', helpeeUserId);
    const file = req.files[0];
    try {
      const result = await uploadFile(file, 'helpee-profile-pictures');
      console.log('helpee-result: ', result);
      await helpeeModel.updateHelpeeProfilePicPath({
        userId: helpeeUserId,
        path: result.Key,
      });
      await unlinkFile(file.path);
      res.status(200).send({ imagePath: `/images/${result.Key}` });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);

router.post(
  '/api/helper/basic-form',
  async (req, res, next) => {
    const { helperUserId, introduction, username, isAnonymous, isMarketing, age, linkedInUrl, notes } =
      req.body;
    try {
      await helperModel.updateHelperCertificatePath({
        userId: helperUserId,
        introduction,
        username,
        isAnonymous,
        isMarketing,
        age,
        linkedInUrl,
        notes,
        path: 'no_certificate_uploaded',
      });
      res.status(200).send({ status: 'success' });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);

router.post(
  '/api/helper/certificate-upload',
  upload.array('certificate', 3), // leverage multer for pdf files. Set max # of files to upload: 3.
  async (req, res, next) => {
    const file = req.files[0];
    const { helperUserId, username, introduction, isAnonymous, isMarketing, age, linkedInUrl, notes } =
      req.body;
    try {
      const result = await uploadFile(file, 'user-certificates');
      await helperModel.updateHelperCertificatePath({
        userId: helperUserId,
        username,
        isAnonymous,
        isMarketing,
        age,
        introduction,
        linkedInUrl,
        notes,
        path: result.Key,
      });
      if (file) await unlinkFile(file.path);
      res.status(200).send({ status: 'success' });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);

router.post('/api/helpee/basic-form', async (req, res, next) => {
  const {
    helpeeUserId,
    introduction,
    username,
    isAnonymous,
    age,
    notes,
  } = req.body;
  try {
    await helpeeModel.updateHelpeeCertificatePath({
      userId: helpeeUserId,
      introduction,
      username,
      isAnonymous,
      age,
      notes,
    });
    res.status(200).send({ status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
