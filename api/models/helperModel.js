const { query } = require('./query');

async function insertHelperOffer(data) {
  const sql = 'INSERT INTO offers SET?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

async function getHelperAllOffers(data) {
  const { helperUserId } = data;
  const sql = `SELECT helper.profilePicPath, helper.languages, helper.username AS helperName, helper.isAnonymous, ofs.* 
  FROM offers ofs
  INNER JOIN helper_account helper ON ofs.userId = helper.id
  WHERE ofs.userId = ? AND NOT ofs.status='deleted' ORDER BY id DESC;`;
  const allOffers = await query(sql, helperUserId);
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
  WHERE helperId = ? ORDER BY id DESC;`;
  const allBookings = await query(sql, helperUserId);
  return { data: { allBookings } };
}

async function getPotentialCustomers(data) {
  const { helperUserId } = data;
  const sql = ` SELECT DISTINCT bk.id AS bookingId, bk.bookingStatus AS bookingStatus
    , req.organization AS organization
    , req.id AS requestId, ofs.id AS offerId
    , ofs.price AS price, ofs.duration AS duration, req.country AS country
    , acc.id AS helperId, acc.username AS helperUsername, acc.isAnonymous AS helperAnonymous
    , req.userId AS helpeeId, helpee.username AS helpeeUsername, helpee.isAnonymous AS helpeeAnonymous, helpee.profilePicPath AS profilePicPath
    , ofs.mainType AS mainType, ofs.secondType AS secondType
    , ofs.thirdType AS thirdType, ofs.fourthType AS fourthType
    FROM offers ofs
LEFT JOIN helper_account acc ON ofs.userId = acc.id
LEFT JOIN requests req ON 
		    ofs.mainType = req.mainType AND ofs.secondType = req.secondType
        AND ofs.country = req.country
LEFT JOIN helpee_account helpee ON req.userId = helpee.id
LEFT JOIN bookings bk ON bk.requestId = req.id AND bk.offerId = ofs.id
WHERE acc.id = ? AND NOT req.userId IS NULL
ORDER BY req.id DESC;`;
  const allPotentialCustomers = await query(sql, helperUserId);
  return { data: { allPotentialCustomers } };
}

async function updateHelperProfilePicPath(data) {
  const { userId, path } = data;
  const sql = `
    UPDATE helper_account SET profilePicPath = ? WHERE id = ?`;
  const sqlquery = await query(sql, [path, userId]);
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
    UPDATE helper_account SET username =?, introduction=?
    , nationality=?, residenceCountry=?
    , isAnonymous=?, isMarketing=?
    , certificatePath = ?, age = ?, linkedInUrl = ?, notes = ?, status= ?
    , hasMonToFri=?, hasWeekend=?, hasBefore12=?, has12To18=?, hasAfter18=?
      ,hasEnglish=?, hasGerman=?, hasFrench=?, hasItalien=?
      ,hasChinese=?, hasCantonese=?, hasVietnamese=?
      ,hasKorean=?, hasJapanese=?, hasTurkish=?, hasUkrainian=?
      ,hasArabic=?, hasOthers=?, languages=?
      ,bankAccount=?
    WHERE id =?`;
  const sqlquery = await query(sql, [
    username,
    introduction,
    nationality,
    residenceCountry,
    isAnonymous,
    isMarketing,
    path || 'No Path',
    age,
    linkedInUrl || 'No LinkedinURL',
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
    bankAccount,
    userId,
  ]);
  return sqlquery;
}

async function deleteHelperOffer(data) {
  const { offerId } = data;
  const sql = `UPDATE offers SET status='deleted' WHERE id=?`;
  await query(sql, offerId);
  return { data: { status: 'success'} };
}

async function confirmHelperEmail(data) {
  const { id } = data;
  const sql = `UPDATE helper_account SET confirmed=${true} WHERE id=?`;
  await query(sql, id);
  return { data: { status: 'success' } };
}

async function getAllChattedCustomers(data) {
  const { helperUserId } = data;
  // Find customers who once chatted with you
  const sql = `SELECT DISTINCT chat.helperId AS helperId, helper.username AS helperUsername, helpee.username AS helpeeUsername
  , helpee.id AS helpeeId, helpee.profilePicPath
  , helpee.introduction
  , chat.offerId, ofs.*
FROM shelpydb.offers ofs
INNER JOIN shelpydb.chat_history chat ON ofs.userId = chat.helperId AND chat.offerId = ofs.id
INNER JOIN shelpydb.helper_account helper ON chat.helperId = helper.id
INNER JOIN shelpydb.helpee_account helpee ON chat.helpeeId = helpee.id
WHERE ofs.id IN (SELECT offerId FROM shelpydb.chat_history WHERE helperId =?) AND helperId=?;`;
  const allChattedCustomers = await query(sql, [helperUserId, helperUserId]);
  return { data: { allChattedCustomers } };
}

module.exports = {
  insertHelperOffer,
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
