const { query } = require('./query');

async function insertHelpeeRequest(data) { // new.
  const sql = 'INSERT INTO requests SET?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

async function updateHelpeeRequest(data) {
  const {
    secondType,
    thirdType,
    fourthType,
    organization,
    years,
    country,
    school,
    department,
    degree,
    industry,
    job,
    WFH,
    companySize,
    selfEmployedType,
    profession,
    notes,
    sharingTopicEN,
    itemId,
  } = data;
  const sql = `
    UPDATE requests SET secondType=?, thirdType=?
    , fourthType=?, organization=?
    , years=?
    , country = ?, school = ?, department = ?, degree= ?
    , industry=?, job=?, WFH=?, companySize=?, selfEmployedType=?
      ,profession=?, notes=?, sharingTopicEN=?
      ,step = ?
    WHERE id =?`;
  const sqlquery = await query(sql, [
    secondType,
    thirdType,
    fourthType,
    organization,
    years,
    country,
    school,
    department,
    degree,
    industry,
    job,
    WFH,
    companySize,
    selfEmployedType,
    profession,
    notes,
    sharingTopicEN,
    'updated',
    itemId,
  ]);
  return sqlquery;
}

async function getHelpeeAllOrders(data) { // all requests
  const sqlSimplified = ` SELECT helpee.profilePicPath, helpee.languages
  , helpee.username AS helpeeName, helpee.isAnonymous, helpee.introduction, helpee.introductionEN
  , req.*
  FROM requests req
  INNER JOIN helpee_account helpee ON req.userId = helpee.id
  WHERE userId=? AND NOT req.status ='deleted' ORDER BY id DESC;`;
  const allRequests = await query(sqlSimplified, data.helpeeUserId);
  return { data: { allOrders: allRequests } };
}

async function getHelpeeAllBookings(data) {
  const sqlSimplified = ` SELECT bookings.id AS bookingId, helpee.email AS helpeeEmail
  , acc.profilePicPath AS profilePicPath, acc.isAnonymous AS helperAnonymous, acc.introduction, acc.introductionEN
  , acc.languages
  , ofs.notes AS notes, ofs.sharingTopicEN
  , bookings.*, meet.joinUrl
  FROM bookings bookings
  LEFT JOIN offers ofs ON bookings.offerId = ofs.id
  LEFT JOIN helper_account acc ON bookings.helperId = acc.id
  LEFT JOIN helpee_account helpee ON bookings.helpeeId = helpee.id
  LEFT JOIN meetings meet ON bookings.id = meet.bookingId
  WHERE bookings.helpeeId=? ORDER BY priorityScore DESC;`;
  const allBookings = await query(sqlSimplified, data.helpeeUserId);
  return { data: { allBookings } };
}

async function getPotentialHelpers(data) {
  const { helpeeUserId } = data;
  const sql = `SELECT DISTINCT req.id AS requestId
    , req.country AS country
    , ofs.id AS offerId, ofs.price AS price, acc.id AS helperId, acc.isAnonymous AS helperAnonymous
    , helpee.id AS helpeeId, helpee.username AS helpeeUsername, helpee.isAnonymous AS helpeeAnonymous
    , ofs.organization AS organization
    , acc.id AS helperId, acc.username AS helperUsername, acc.introduction, acc.introductionEN
    , acc.notificationLanguage
    , acc.profilePicPath AS profilePicPath, acc.languages, acc.email AS helperEmail
		, ofs.mainType AS mainType, ofs.secondType AS secondType
    , ofs.thirdType AS thirdType, ofs.fourthType AS fourthType
    , ofs.duration, ofs.notes, ofs.sharingTopicEN
    FROM offers ofs
LEFT JOIN helper_account acc ON ofs.userId = acc.id
LEFT JOIN requests req ON 
		    ofs.mainType = req.mainType AND ofs.secondType = req.secondType
        AND ofs.country = req.country
LEFT JOIN helpee_account helpee ON req.userId = helpee.id
WHERE helpee.id = ? AND NOT ofs.userId IS NULL AND acc.internalStatus IN ('pass_eligibility_email_sent') 
AND NOT ofs.status ='deleted' AND NOT req.status = 'deleted'
ORDER BY acc.score, ofs.id DESC;`;

const sqlForRating = `
  SELECT writerUsername, ratedPartnerId, score, comments
  FROM ratings
  WHERE ratedPartnerId IN (
  SELECT DISTINCT acc.id
    FROM offers ofs
LEFT JOIN helper_account acc ON ofs.userId = acc.id
LEFT JOIN requests req ON 
		    ofs.mainType = req.mainType AND ofs.secondType = req.secondType
        AND ofs.country = req.country
LEFT JOIN helpee_account helpee ON req.userId = helpee.id
WHERE helpee.id = ? AND NOT ofs.userId IS NULL AND acc.internalStatus IN ('pass_eligibility_email_sent') 
AND NOT ofs.status ='deleted'
  ) AND writerRole = 'helpee'
  `;

  const allPotentialHelpers = await query(sql, helpeeUserId);
  const allPotentialHelpersRatings = await query(sqlForRating, helpeeUserId);

  return { data: { allPotentialHelpers, allPotentialHelpersRatings } };
}

async function getHelpeeOrderHelperList(data) {
  const { requestId } = data;
  const sql = `
    SELECT DISTINCT a.id AS helperId, a.username, a.nationality, a.nativeLanguage, a.firstLanguage, a.secondLanguage
    FROM helper_account a
    INNER JOIN helper_accept_request b ON a.id = b.helperId
    WHERE b.requestId = ?;`;
  const sqlResult = await query(sql, requestId);
  return { data: { helpers: sqlResult } };
}

async function getHelpeeSingleRequest(data) {
  const { requestId } = data;
  const sql = `SELECT helpee.profilePicPath, helpee.languages, helpee.username AS helpeeName
  , helpee.isAnonymous, helpee.introduction, helpee.introductionEN, req.* 
  FROM requests req
  INNER JOIN helpee_account helpee ON req.userId = helpee.id
  WHERE req.id = ? AND NOT req.status='deleted' ORDER BY id DESC;`;
  const singleRequest = await query(sql, requestId);
  return { data: { singleRequest } };
}

async function updateHelpeeProfilePicPath(data) {
  const { userId, path } = data;
  const sql = `
    UPDATE helpee_account SET profilePicPath = ? WHERE id = ?`;
  const sqlquery = await query(sql, [path, userId]);
  return sqlquery;
}

async function updateHelpeeBasicInfo(data) {
  const {
    userId,
    username,
    introduction,
    introductionEN,
    isAnonymous,
    age,
    nationality,
    residenceCountry,
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
  } = data;
  const sql = `
    UPDATE helpee_account SET introduction=?, introductionEN=?
      ,nationality=?, residenceCountry=?
      ,isAnonymous=?, age =?, notes =?, status=? 
      ,hasMonToFri=?, hasWeekend=?, hasBefore12=?, has12To18=?, hasAfter18=?
      ,hasEnglish=?, hasGerman=?, hasFrench=?, hasItalien=?
      ,hasChinese=?, hasCantonese=?, hasVietnamese=?
      ,hasKorean=?, hasJapanese=?, hasTurkish=?, hasUkrainian=?
      ,hasArabic=?, hasOthers=?, languages=?, notificationLanguage=?, username=?
    WHERE id = ?`;
  const sqlquery = await query(sql, [
    introduction,
    introductionEN,
    nationality,
    residenceCountry,
    isAnonymous,
    age,
    notes,
    status,
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
    notificationLanguage,
    username,
    userId,
  ]);
  return sqlquery;
}

async function deleteHelpeeRequest(data) {
  const { requestId } = data;
  const sql = `UPDATE requests SET status='deleted' WHERE id=?`;
  await query(sql, requestId);
  return { data: { status: 'success' } };
}

async function confirmHelpeeEmail(data) {
  const { id } = data;
  const sql = `UPDATE helpee_account SET confirmed=${true} WHERE id=?`;
  await query(sql, id);
  return { data: { status: 'success' } };
}

async function getAllChattedHelpers(data) {
  const { helpeeUserId } = data;
  const sql = `SELECT DISTINCT chat.helperId AS helperId, helper.username AS helperUsername
  , helpee.id AS helpeeId, helpee.username AS helpeeUsername
  , helper.profilePicPath, helper.isAnonymous AS helperAnonymous, helper.introduction
  , helper.introductionEN, helper.languages
  , chat.offerId, ofs.*
FROM shelpydb.offers ofs
INNER JOIN shelpydb.chat_history chat ON ofs.userId = chat.helperId AND chat.offerId = ofs.id
INNER JOIN shelpydb.helper_account helper ON chat.helperId = helper.id
INNER JOIN shelpydb.helpee_account helpee ON chat.helpeeId = helpee.id
WHERE ofs.id IN (SELECT offerId FROM shelpydb.chat_history WHERE helpeeId =?) AND helpeeId=?;`;
  
  const allChattedHelpers = await query(sql, [helpeeUserId, helpeeUserId]);
  return { data: { allChattedHelpers } };
}

async function getBookingDetails(data) {
  const sqlSimplified = ` SELECT *
  FROM bookings
  WHERE id=? LIMIT 1;`;
  const booking = await query(sqlSimplified, data.bookingId);
  return { data: { booking } };
}

async function getHelpeeData(data) {
  const sqlSimplified = ` SELECT *
  FROM helpee_account
  WHERE id=? LIMIT 1;`;
  const helpeeData = await query(sqlSimplified, data.helpeeUserId);
  return { data: { helpeeData } };
}

async function getHelpeeRatings(data) {
  const sqlSimplified = ` SELECT writerUsername, score, comments
  FROM ratings
  WHERE ratedPartnerId=? AND writerRole='helper' ORDER BY id DESC;`;
  const helpeeRatingData = await query(sqlSimplified, data.helpeeUserId);
  return { data: { helpeeRatingData } };
}

module.exports = {
  insertHelpeeRequest,
  getHelpeeAllOrders,
  getHelpeeOrderHelperList,
  updateHelpeeProfilePicPath,
  updateHelpeeBasicInfo,
  getPotentialHelpers,
  deleteHelpeeRequest,
  confirmHelpeeEmail,
  getHelpeeAllBookings,
  getAllChattedHelpers,
  getBookingDetails,
  getHelpeeData,
  getHelpeeRatings,
  getHelpeeSingleRequest,
  updateHelpeeRequest,
};
