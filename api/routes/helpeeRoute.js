const router = require('express').Router();
const { wrapAsync } = require('../../util/util');

const {
    getHelpeeInfo,
    postHelpeeInfo,
    testAPIConnection,
} = require('../controllers/helpeeController');

router.route("/api/helpee").get(wrapAsync(getHelpeeInfo));
router.route("/api/helpee").post(wrapAsync(postHelpeeInfo));
router.route("/api/test").get(wrapAsync(testAPIConnection));

module.exports = router;