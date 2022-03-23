const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const customRateLimiter = require('../../util/customRateLimiter');

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
  getPotentialHelpers,
  deleteHelpeeRequest,
  confirmHelpeeEmail,
  confirmHelpeeCanChangePassword,
  sendHelpeePasswordResetLink,
  getHelpeeAllBookings,
  // payHelper,
  payTapPay,
  getAllChattedHelpers,
  getBookingDetails,
} = require('../controllers/helpeeController');

const {
  postHelperOffer,
  getPotentialCustomers,
  deleteHelperOffer,
  allowHelperPrivateRoute,
  getProfilePic,
  getHelperAllOffers,
  confirmHelperEmail,
  confirmHelperCanChangePassword,
  sendHelperPasswordResetLink,
  getHelperAllBookings,
  getAllMarketingOffers,
  getAllChattedCustomers,
  updatePayPalAccount,
} = require('../controllers/helperController');

const {
  updateBookingStatus,
  getBookingStatus,
  unsubscibeEmail,
} = require('../controllers/bookingController');

const { postUserSignInData } = require('../controllers/signInController');
const { postUserSignUpData } = require('../controllers/signUpController');

const {
  confirmCanAccessChatroom,
  confirmCanAccessDashboard,
} = require('../controllers/generalController');

router
  .route('/api/helpee/get-auth-status')
  .post(verifyHelpeeToken, wrapAsync(allowHelpeePrivateRoute));
router
  .route('/api/helper/get-auth-status')
  .post(verifyHelperToken, wrapAsync(allowHelperPrivateRoute));

router
  .route('/api/helpee/signup-password')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(postUserSignUpData)
  );
router
  .route('/api/helpee/email/confirmation')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(confirmHelpeeEmail)
  );
router
  .route('/api/helper/email/confirmation')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(confirmHelperEmail)
  );
router
  .route('/api/helpee/password/allow-change')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(confirmHelpeeCanChangePassword)
  );
router
  .route('/api/helper/password/allow-change')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(confirmHelperCanChangePassword)
  );
router
  .route('/api/access-chatroom')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(confirmCanAccessChatroom)
  );

router
  .route('/api/access-dashboard')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(confirmCanAccessDashboard)
  );

router
  .route('/api/helpee/request-form') // depreciated
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(postHelpeeServiceRequestForm)
  );

router
  .route('/api/helpee/request')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(postHelpeeRequest)
  ); // latest
router
  .route('/api/helpee/request')
  .delete(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(deleteHelpeeRequest)
  );

router
  .route('/api/helper/paypal-account')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(updatePayPalAccount)
  );

router
  .route('/api/helper/offer')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(postHelperOffer)
  );
router
  .route('/api/helper/offer')
  .delete(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(deleteHelperOffer)
  );

router
  .route('/api/helpee/all-orders')
  .get(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(getHelpeeAllOrders)
  );
router
  .route('/api/helpee/all-bookings')
  .get(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(getHelpeeAllBookings)
  );
router
  .route('/api/helper/all-offers')
  .get(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(getHelperAllOffers)
  );
router
  .route('/api/helper/all-bookings')
  .get(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(getHelperAllBookings)
  );

router
  .route('/api/helper/potential-customers')
  .get(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(getPotentialCustomers)
  );
router
  .route('/api/helpee/potential-helpers')
  .get(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(getPotentialHelpers)
  );

router
  .route('/api/helpee/sign-in')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(postUserSignInData)
  );
router
  .route('/api/helpee/helper-list')
  .get(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(getHelpeeOrderHelperList)
  );

router
  .route('/api/helper/signup-password')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(postUserSignUpData)
  );
router
  .route('/api/helpee/password/reset')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(sendHelpeePasswordResetLink)
  );
router
  .route('/api/helper/password/reset')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(sendHelperPasswordResetLink)
  );

router
  .route('/api/helper/sign-in')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(postUserSignInData)
  );

router
  .route('/images/:key(*)')
  .get(wrapAsync(getProfilePic));

router.post(
  '/api/helper/profile-pic-upload',
  customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
  upload.array('profilePic', 3),
  async (req, res) => {
    const { helperUserId } = req.body;
    const file = req.files[0];
    try {
      const result = await uploadFile(file, 'helper-profile-pictures');
      await helperModel.updateHelperProfilePicPath({
        userId: helperUserId,
        path: result.Key,
      });
      if (file) await unlinkFile(file.path);
      res.status(200).send({ imagePath: `/images/${result.Key}` });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);

router.post(
  '/api/helpee/profile-pic-upload',
  customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
  upload.array('profilePic', 3),
  async (req, res) => {
    const { helpeeUserId } = req.body;
    const file = req.files[0];
    try {
      const result = await uploadFile(file, 'helpee-profile-pictures');
      await helpeeModel.updateHelpeeProfilePicPath({
        userId: helpeeUserId,
        path: result.Key,
      });
      if (file) await unlinkFile(file.path);
      res.status(200).send({ imagePath: `/images/${result.Key}` });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);

router.post(
  '/api/helper/basic-form',
  customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
  async (req, res) => {
    const {
      userId,
      introduction,
      isAnonymous,
      isMarketing,
      age,
      nationality,
      residenceCountry,
      linkedInUrl,

      hasMonToFri,
      hasWeekend,
      hasBefore12,
      has12To18,
      hasAfter18,
      hasEnglish,
      hasGerman,
      hasFrench,
      hasItalien,
      hasChinese,
      hasCantonese,
      hasVietnamese,
      hasKorean,
      hasJapanese,
      hasTurkish,
      hasUkrainian,
      hasArabic,
      hasOthers,

      languages,

      notes,
      status,
      notificationLanguage,
    } = req.body;
    try {
      await helperModel.updateHelperCertificatePath({
        userId,
        introduction,
        isAnonymous,
        isMarketing,
        age,
        nationality,
        residenceCountry,
        linkedInUrl,

        hasMonToFri,
        hasWeekend,
        hasBefore12,
        has12To18,
        hasAfter18,
        hasEnglish,
        hasGerman,
        hasFrench,
        hasItalien,
        hasChinese,
        hasCantonese,
        hasVietnamese,
        hasKorean,
        hasJapanese,
        hasTurkish,
        hasUkrainian,
        hasArabic,
        hasOthers,

        languages,

        notes,
        path: 'no_certificate_uploaded',
        status,
        notificationLanguage,
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
  customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
  upload.array('certificate', 3), // leverage multer for pdf files. Set max # of files to upload: 3.
  async (req, res) => {
    const file = req.files[0];
    const isAnonymous =
      req.body.isAnonymous === 'true' || req.body.isAnonymous === true;
    const isMarketing =
      req.body.isMarketing === 'true' || req.body.isMarketing === true;
    const hasMonToFri =
      req.body.hasMonToFri === 'true' || req.body.hasMonToFri === true;
    const hasWeekend =
      req.body.hasWeekend === 'true' || req.body.hasWeekend === true;
    const hasBefore12 =
      req.body.hasBefore12 === 'true' || req.body.hasBefore12 === true;
    const has12To18 =
      req.body.has12To18 === 'true' || req.body.has12To18 === true;
    const hasAfter18 =
      req.body.hasAfter18 === 'true' || req.body.hasAfter18 === true;
    const hasEnglish =
      req.body.hasEnglish === 'true' || req.body.hasEnglish === true;
    const hasGerman =
      req.body.hasGerman === 'true' || req.body.hasGerman === true;
    const hasFrench =
      req.body.hasFrench === 'true' || req.body.hasFrench === true;
    const hasItalien =
      req.body.hasItalien === 'true' || req.body.hasItalien === true;
    const hasChinese =
      req.body.hasChinese === 'true' || req.body.hasChinese === true;
    const hasCantonese =
      req.body.hasCantonese === 'true' || req.body.hasCantonese === true;
    const hasVietnamese =
      req.body.hasVietnamese === 'true' || req.body.hasVietnamese === true;
    const hasKorean =
      req.body.hasKorean === 'true' || req.body.hasKorean === true;
    const hasJapanese =
      req.body.hasJapanese === 'true' || req.body.hasJapanese === true;
    const hasTurkish =
      req.body.hasTurkish === 'true' || req.body.hasTurkish === true;
    const hasUkrainian =
      req.body.hasUkrainian === 'true' || req.body.hasUkrainian === true;
    const hasArabic =
      req.body.hasArabic === 'true' || req.body.hasArabic === true;
    const hasOthers =
      req.body.hasOthers === 'true' || req.body.hasOthers === true;

    const {
      userId,
      introduction,
      age,
      nationality,
      residenceCountry,
      linkedInUrl,
      notes,
      languages,
      status,
      notificationLanguage,
    } = req.body;
    try {
      const result = await uploadFile(file, 'user-certificates');
      await helperModel.updateHelperCertificatePath({
        userId,
        isAnonymous,
        isMarketing,
        age,
        nationality,
        residenceCountry,
        introduction,
        linkedInUrl,
        notes,

        hasMonToFri,
        hasWeekend,
        hasBefore12,
        has12To18,
        hasAfter18,
        hasEnglish,
        hasGerman,
        hasFrench,
        hasItalien,
        hasChinese,
        hasCantonese,
        hasVietnamese,
        hasKorean,
        hasJapanese,
        hasTurkish,
        hasUkrainian,
        hasArabic,
        hasOthers,

        languages,

        path: result.Key,

        status,
        notificationLanguage,
      });
      if (file) await unlinkFile(file.path);
      res.status(200).send({ status: 'success' });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);

router.post(
  '/api/helpee/basic-form',
  customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
  async (req, res) => {
    const isAnonymous =
      req.body.isAnonymous === 'true' || req.body.isAnonymous === true;
    const hasMonToFri =
      req.body.hasMonToFri === 'true' || req.body.hasMonToFri === true;
    const hasWeekend =
      req.body.hasWeekend === 'true' || req.body.hasWeekend === true;
    const hasBefore12 =
      req.body.hasBefore12 === 'true' || req.body.hasBefore12 === true;
    const has12To18 =
      req.body.has12To18 === 'true' || req.body.has12To18 === true;
    const hasAfter18 =
      req.body.hasAfter18 === 'true' || req.body.hasAfter18 === true;
    const hasEnglish =
      req.body.hasEnglish === 'true' || req.body.hasEnglish === true;
    const hasGerman =
      req.body.hasGerman === 'true' || req.body.hasGerman === true;
    const hasFrench =
      req.body.hasFrench === 'true' || req.body.hasFrench === true;
    const hasItalien =
      req.body.hasItalien === 'true' || req.body.hasItalien === true;
    const hasChinese =
      req.body.hasChinese === 'true' || req.body.hasChinese === true;
    const hasCantonese =
      req.body.hasCantonese === 'true' || req.body.hasCantonese === true;
    const hasVietnamese =
      req.body.hasVietnamese === 'true' || req.body.hasVietnamese === true;
    const hasKorean =
      req.body.hasKorean === 'true' || req.body.hasKorean === true;
    const hasJapanese =
      req.body.hasJapanese === 'true' || req.body.hasJapanese === true;
    const hasTurkish =
      req.body.hasTurkish === 'true' || req.body.hasTurkish === true;
    const hasUkrainian =
      req.body.hasUkrainian === 'true' || req.body.hasUkrainian === true;
    const hasArabic =
      req.body.hasArabic === 'true' || req.body.hasArabic === true;
    const hasOthers =
      req.body.hasOthers === 'true' || req.body.hasOthers === true;
    const {
      userId,
      introduction,
      age,
      nationality,
      residenceCountry,
      notificationLanguage,
      languages,
      notes,
      status,
    } = req.body;
    try {
      await helpeeModel.updateHelpeeBasicInfo({
        userId,
        introduction,
        isAnonymous,
        age,
        nationality,
        residenceCountry,
        notificationLanguage,
        hasMonToFri,
        hasWeekend,
        hasBefore12,
        has12To18,
        hasAfter18,
        hasEnglish,
        hasGerman,
        hasFrench,
        hasItalien,
        hasChinese,
        hasCantonese,
        hasVietnamese,
        hasKorean,
        hasJapanese,
        hasTurkish,
        hasUkrainian,
        hasArabic,
        hasOthers,

        languages,

        notes,
        status,
      });
      res.status(200).send({ status: 'success' });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);

router
  .route('/api/booking-status')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(updateBookingStatus)
  );

// router
//   .route('/api/helpee/pay')
//   .post(
//     customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
//     wrapAsync(payHelper)
//   );

router
  .route('/api/tappay/pay')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(payTapPay)
  );

router
  .route('/api/booking-status')
  .get(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(getBookingStatus)
  );

router
  .route('/api/marketing-offers')
  .get(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(getAllMarketingOffers)
  );

router
  .route('/api/helpee/chat/partners')
  .get(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(getAllChattedHelpers)
  );

router
  .route('/api/helper/chat/partners')
  .get(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(getAllChattedCustomers)
  );

router
  .route('/api/unsubscribe/email')
  .post(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(unsubscibeEmail)
  );

router
  .route('/api/booking/details')
  .get(
    customRateLimiter({ secondsWindow: 10, allowedHits: 10 }),
    wrapAsync(getBookingDetails)
  );

module.exports = router;
