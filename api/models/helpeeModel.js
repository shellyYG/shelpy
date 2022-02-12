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
  const sqlSimplified = ` SELECT * FROM requests WHERE userId=${data.helpeeUserId} ORDER BY id DESC;`;
  const allRequests = await query(sqlSimplified);
  return { data: { allOrders: allRequests } };
}

async function getHelpeeAllBookings(data) {
  const sqlSimplified = ` SELECT bookings.*, acc.profilePicPath AS profilePicPath
  FROM bookings bookings
  LEFT JOIN helper_account acc ON bookings.helperId = acc.id
  WHERE helpeeId=${data.helpeeUserId} ORDER BY id DESC;`;
  const allBookings = await query(sqlSimplified);
  return { data: { allBookings } };
}

async function getPotentialHelpers(data) {
  const { helpeeUserId } = data;
  const sql = `SELECT DISTINCT bk.id AS bookingId, bk.bookingStatus AS bookingStatus, req.id AS requestId
    , req.country AS country
    , ofs.id AS offerId, ofs.price AS price, acc.id AS helperId, acc.isAnonymous AS helperAnonymous
    , helpee.id AS helpeeId, helpee.username AS helpeeUsername, helpee.isAnonymous AS helpeeAnonymous
    , acc.id AS helperId, acc.username AS helperUsername, acc.profilePicPath AS profilePicPath
		, req.mainType AS mainType, req.secondType AS secondType
    , req.thirdType AS thirdType, req.fourthType AS fourthType
    FROM offers ofs
LEFT JOIN helper_account acc ON ofs.userId = acc.id
LEFT JOIN requests req ON 
		    ofs.mainType = req.mainType AND ofs.secondType = req.secondType AND ofs.thirdType = req.thirdType
        AND ofs.country = req.country
LEFT JOIN helpee_account helpee ON req.userId = helpee.id
LEFT JOIN bookings bk ON bk.requestId = req.id AND bk.offerId = ofs.id
WHERE helpee.id = ${helpeeUserId} AND NOT ofs.userId IS NULL
ORDER BY req.id DESC;`;
  const allPotentialHelpers = await query(sql);
  return { data: { allPotentialHelpers } };
}

async function getHelpeeOrderHelperList(data) {
  const { requestId } = data;
  const sql = `
    SELECT DISTINCT a.id AS helperId, a.username, a.nationality, a.nativeLanguage, a.firstLanguage, a.secondLanguage
    FROM helper_account a
    INNER JOIN helper_accept_request b ON a.id = b.helperId
    WHERE b.requestId = ${requestId};`;
  const sqlResult = await query(sql);
  return { data: { helpers: sqlResult } };
}

async function updateHelpeeProfilePicPath(data) {
  const { userId, path } = data;
  const sql = `
    UPDATE helpee_account SET profilePicPath = '${path}' WHERE id = ${userId}`;
  const sqlquery = await query(sql);
  return sqlquery;
}

async function updateHelpeeBasicInfo(data) {
  const {
    userId,
    introduction,
    username,
    isAnonymous,
    age,
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
    notes,
    status,
  } = data;
  const sql = `
    UPDATE helpee_account SET username = '${username}', introduction='${introduction}', isAnonymous=${isAnonymous}, age = '${age}', notes = '${notes}', status='${status}' 
      ,hasMonToFri=${hasMonToFri}, hasWeekend=${hasWeekend}, hasBefore12=${hasBefore12}, has12To18=${has12To18}, hasAfter18=${hasAfter18}
      ,hasEnglish=${hasEnglish}, hasGerman=${hasGerman}, hasFrench=${hasFrench}, hasItalien=${hasItalien}
      ,hasChinese=${hasChinese}, hasCantonese=${hasCantonese}, hasVietnamese=${hasVietnamese}
      ,hasKorean=${hasKorean}, hasJapanese=${hasJapanese}, hasTurkish=${hasTurkish}, hasUkrainian=${hasUkrainian}
      ,hasArabic=${hasArabic}, hasOthers=${hasOthers}
    WHERE id = ${userId}`;
  const sqlquery = await query(sql);
  return sqlquery;
}

async function deleteHelpeeRequest(data) {
  const { requestId } = data;
  const sql = `UPDATE requests SET status='deleted' WHERE id=${requestId}`;
  await query(sql);
  return { data: { status: 'success' } };
}

async function confirmHelpeeEmail(data) {
  const { id } = data;
  const sql = `UPDATE helpee_account SET confirmed=${true} WHERE id=${id}`;
  await query(sql);
  return { data: { status: 'success' } };
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
};
