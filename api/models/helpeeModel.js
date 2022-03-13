const { query } = require('./query');

async function insertHelpeeRequestFormAndGetId(data) { // old.
  const sql = 'INSERT INTO request_form SET?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

async function insertHelpeeRequest(data) { // new.
  const sql = 'INSERT INTO requests SET?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

async function getHelpeeAllOrders(data) {
  const sqlSimplified = ` SELECT helpee.profilePicPath, helpee.languages
  , helpee.username AS helpeeName, helpee.isAnonymous, helpee.introduction
  , req.*
  FROM requests req
  INNER JOIN helpee_account helpee ON req.userId = helpee.id
  WHERE userId=? ORDER BY id DESC;`;
  const allRequests = await query(sqlSimplified, data.helpeeUserId);
  return { data: { allOrders: allRequests } };
}

async function getHelpeeAllBookings(data) {
  const sqlSimplified = ` SELECT bookings.id AS bookingId, helpee.email AS helpeeEmail, helpee.languages
  , acc.profilePicPath AS profilePicPath, acc.isAnonymous AS helperAnonymous, acc.introduction
  , ofs.notes AS notes
  , bookings.*
  FROM bookings bookings
  LEFT JOIN offers ofs ON bookings.offerId = ofs.id
  LEFT JOIN helper_account acc ON bookings.helperId = acc.id
  LEFT JOIN helpee_account helpee ON bookings.helpeeId = helpee.id
  WHERE helpeeId=? ORDER BY id DESC;`;
  const allBookings = await query(sqlSimplified, data.helpeeUserId);
  return { data: { allBookings } };
}

async function getPotentialHelpers(data) {
  const { helpeeUserId } = data;
  const sql = `SELECT DISTINCT bk.id AS bookingId, bk.bookingStatus AS bookingStatus, req.id AS requestId
    , req.country AS country
    , ofs.id AS offerId, ofs.price AS price, acc.id AS helperId, acc.isAnonymous AS helperAnonymous
    , helpee.id AS helpeeId, helpee.username AS helpeeUsername, helpee.isAnonymous AS helpeeAnonymous
    , ofs.organization AS organization
    , acc.id AS helperId, acc.username AS helperUsername, acc.introduction
    , acc.profilePicPath AS profilePicPath
		, req.mainType AS mainType, req.secondType AS secondType
    , req.thirdType AS thirdType, req.fourthType AS fourthType
    , ofs.duration, ofs.notes
    FROM offers ofs
LEFT JOIN helper_account acc ON ofs.userId = acc.id
LEFT JOIN requests req ON 
		    ofs.mainType = req.mainType AND ofs.secondType = req.secondType
        AND ofs.country = req.country
LEFT JOIN helpee_account helpee ON req.userId = helpee.id
LEFT JOIN bookings bk ON bk.requestId = req.id AND bk.offerId = ofs.id
WHERE helpee.id = ? AND NOT ofs.userId IS NULL AND acc.status = 'approved'
ORDER BY acc.score, ofs.id DESC;`;
  const allPotentialHelpers = await query(sql, helpeeUserId);

  return { data: { allPotentialHelpers } };
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
    introduction,
    username,
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
  } = data;
  const sql = `
    UPDATE helpee_account SET username =?, introduction=?
      ,nationality=?, residenceCountry=?
      ,isAnonymous=?, age =?, notes =?, status=? 
      ,hasMonToFri=?, hasWeekend=?, hasBefore12=?, has12To18=?, hasAfter18=?
      ,hasEnglish=?, hasGerman=?, hasFrench=?, hasItalien=?
      ,hasChinese=?, hasCantonese=?, hasVietnamese=?
      ,hasKorean=?, hasJapanese=?, hasTurkish=?, hasUkrainian=?
      ,hasArabic=?, hasOthers=?, languages=?
    WHERE id = ?`;
  const sqlquery = await query(sql, [
    username,
    introduction,
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
  , helper.introduction
  , chat.offerId, ofs.*
FROM shelpydb.offers ofs
INNER JOIN shelpydb.chat_history chat ON ofs.userId = chat.helperId AND chat.offerId = ofs.id
INNER JOIN shelpydb.helper_account helper ON chat.helperId = helper.id
INNER JOIN shelpydb.helpee_account helpee ON chat.helpeeId = helpee.id
WHERE ofs.id IN (SELECT offerId FROM shelpydb.chat_history WHERE helpeeId =?) AND helpeeId=?;`;
  
  const allChattedHelpers = await query(sql, [helpeeUserId, helpeeUserId]);
  return { data: { allChattedHelpers } };
}

module.exports = {
  insertHelpeeRequestFormAndGetId,
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
};
