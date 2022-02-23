const { query } = require('./query');

async function insertHelperOffer(data) {
  const sql = 'INSERT INTO offers SET?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

// TODO
async function getHelperAllMatchedRequests(data) {
  const sql = `SELECT * FROM requests WHERE userId=${data.helperUserId} ORDER BY id DESC;`;
  const allOrders = await query(sql);
  return { data: { allOrders } };
}

async function getHelperAllOffers(data) {
  const { helperUserId } = data;
  const sql = ` SELECT helper.profilePicPath, helper.languages, helper.username AS helperName, helper.isAnonymous, ofs.* 
  FROM offers ofs
  INNER JOIN helper_account helper ON ofs.userId = helper.id
  WHERE ofs.userId = ${helperUserId} AND NOT ofs.status='deleted' ORDER BY id DESC;`;
  const allOffers = await query(sql);
  return { data: { allOffers } };
}

async function getAllMarketingOffers() {
  const sql = `
  SELECT ofs.*, acc.username, acc.profilePicPath, acc.introduction, acc.languages, acc.isAnonymous
  FROM offers ofs 
  INNER JOIN helper_account acc ON ofs.userId = acc.id
  WHERE acc.isMarketing = true AND acc.status = 'approved' ORDER BY score, id DESC;`;
  const allMKTOffers = await query(sql);
  return { data: { allMKTOffers } };
}

async function getHelperAllBookings(data) {
  const { helperUserId } = data;
  const sql = ` 
  SELECT bookings.id AS bookingId,acc.languages, bookings.*, acc.profilePicPath AS profilePicPath
  , acc.isAnonymous AS helpeeAnonymous
  FROM bookings bookings
  LEFT JOIN helpee_account acc ON bookings.helpeeId = acc.id
  WHERE helperId = ${helperUserId} ORDER BY id DESC;`;
  const allBookings = await query(sql);
  return { data: { allBookings } };
}

async function getPotentialCustomers(data) {
  const { helperUserId } = data;
  const sql = ` SELECT DISTINCT bk.id AS bookingId, bk.bookingStatus AS bookingStatus
    , req.organization AS organization
    , req.id AS requestId, ofs.id AS offerId
    , ofs.price AS price, req.country AS country
    , acc.id AS helperId, acc.username AS helperUserName, acc.isAnonymous AS helperAnonymous
    , req.userId AS helpeeId, helpee.username AS helpeeUsername, helpee.isAnonymous AS helpeeAnonymous, helpee.profilePicPath AS profilePicPath
    , req.mainType AS mainType, req.secondType AS secondType
    , req.thirdType AS thirdType, req.fourthType AS fourthType
    FROM offers ofs
LEFT JOIN helper_account acc ON ofs.userId = acc.id
LEFT JOIN requests req ON 
		    ofs.mainType = req.mainType AND ofs.secondType = req.secondType
        AND ofs.country = req.country
LEFT JOIN helpee_account helpee ON req.userId = helpee.id
LEFT JOIN bookings bk ON bk.requestId = req.id AND bk.offerId = ofs.id
WHERE acc.id = ${helperUserId} AND NOT req.userId IS NULL
ORDER BY req.id DESC;`;
  const allPotentialCustomers = await query(sql);
  return { data: { allPotentialCustomers } };
}

async function updateHelperProfilePicPath(data) {
  const { userId, path } = data;
  const sql = `
    UPDATE helper_account SET profilePicPath = '${path}' WHERE id = ${userId}`;
  const sqlquery = await query(sql);
  return sqlquery;
}

async function updateHelperCertificatePath(data) {
  const {
    userId,
    introduction,
    username,
    isAnonymous,
    isMarketing,
    path,
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
    bankAccount,
    status,
  } = data;
  const sql = `
    UPDATE helper_account SET username = '${username}', introduction='${introduction}'
    , nationality='${nationality}', residenceCountry='${residenceCountry}'
    , isAnonymous=${isAnonymous}, isMarketing=${isMarketing}
    ,certificatePath = '${path}', age = '${age}', linkedInUrl = '${linkedInUrl}', notes = '${notes}', status='${status}'
    ,hasMonToFri=${hasMonToFri}, hasWeekend=${hasWeekend}, hasBefore12=${hasBefore12}, has12To18=${has12To18}, hasAfter18=${hasAfter18}
      ,hasEnglish=${hasEnglish}, hasGerman=${hasGerman}, hasFrench=${hasFrench}, hasItalien=${hasItalien}
      ,hasChinese=${hasChinese}, hasCantonese=${hasCantonese}, hasVietnamese=${hasVietnamese}
      ,hasKorean=${hasKorean}, hasJapanese=${hasJapanese}, hasTurkish=${hasTurkish}, hasUkrainian=${hasUkrainian}
      ,hasArabic=${hasArabic}, hasOthers=${hasOthers}, languages='${languages}'
      ,bankAccount='${bankAccount}'
    WHERE id = ${userId}`;
  const sqlquery = await query(sql);
  return sqlquery;
}

async function deleteHelperOffer(data) {
  const { offerId } = data;
  const sql = `UPDATE offers SET status='deleted' WHERE id=${offerId}`;
  await query(sql);
  return { data: { status: 'success'} };
}

async function confirmHelperEmail(data) {
  const { id } = data;
  console.log('@Model confirmHelperEmail id: ', id);
  const sql = `UPDATE helper_account SET confirmed=${true} WHERE id=${id}`;
  await query(sql);
  return { data: { status: 'success' } };
}

async function getAllChattedCustomers(data) {
  const { helperUserId } = data;
  // Find customers who once chatted with you
  const sql = `SELECT DISTINCT chat.helperId AS helperId, helpee.username AS helpeeUsername, helpee.id AS helpeeId, helpee.profilePicPath, chat.offerId, ofs.*
FROM shelpydb.offers ofs
INNER JOIN shelpydb.chat_history chat ON ofs.userId = chat.helperId
INNER JOIN shelpydb.helpee_account helpee ON chat.helpeeId = helpee.id
WHERE ofs.id IN (SELECT offerId FROM shelpydb.chat_history WHERE helperId = ${helperUserId});`;
  const allChattedCustomers = await query(sql);
  return { data: { allChattedCustomers } };
}

module.exports = {
  insertHelperOffer,
  getHelperAllMatchedRequests,
  getHelperAllOffers,
  updateHelperProfilePicPath,
  updateHelperCertificatePath,
  deleteHelperOffer,
  getPotentialCustomers,
  confirmHelperEmail,
  getHelperAllBookings,
  getAllMarketingOffers,
  getAllChattedCustomers,
};
