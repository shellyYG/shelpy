const { query } = require('./query');

async function insertHelperOffer(data) {
  const sql = 'INSERT INTO offers SET?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

async function updateHelperOffer(data) {
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
    duration,
    price,
    notes,
    sharingTopicEN,
    itemId,
    isAnonymous,
  } = data;
  const sql = `
    UPDATE offers SET secondType=?, thirdType=?
    , fourthType=?, organization=?
    , years=?
    , country = ?, school = ?, department = ?, degree= ?
    , industry=?, job=?, WFH=?, companySize=?, selfEmployedType=?
      ,profession=?, duration=?, price=?, notes=?, sharingTopicEN=?
      ,step = ?, isAnonymous=?
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
    duration,
    parseInt(price),
    notes,
    sharingTopicEN,
    'updated',
    isAnonymous,
    itemId,
  ]);
  return sqlquery;
}

async function getHelperAllOffers(data) {
  const { helperUserId } = data;
  const sql = `SELECT helper.profilePicPath, helper.languages, helper.username AS helperName
  , ofs.isAnonymous, helper.introduction, helper.introductionEN, ofs.* 
  FROM offers ofs
  INNER JOIN helper_account helper ON ofs.userId = helper.id
  WHERE ofs.userId = ? AND NOT ofs.status='deleted' ORDER BY id DESC;`;
  const allOffers = await query(sql, helperUserId);
  return { data: { allOffers } };
}

async function getHelperSingleOffer(data) {
  const { offerId } = data;
  const sql = `SELECT helper.profilePicPath, helper.languages, helper.username AS helperName
  , ofs.isAnonymous, helper.introduction, helper.introductionEN, ofs.* 
  FROM offers ofs
  INNER JOIN helper_account helper ON ofs.userId = helper.id
  WHERE ofs.id = ? AND NOT ofs.status='deleted' ORDER BY id DESC;`;
  const singleOffer = await query(sql, offerId);
  return { data: { singleOffer} };
}

async function getAllMarketingOffers(data) {
  const { page, filterCountry, filterMainType, filterSecondType } = data;

  const offset = (parseInt(page) - 1) * 10;

  let sql;
  let allOffersCount = 0;
  let allMKTOffers = [];

  const hasFilterCountry = filterCountry && filterCountry !== 'default';
  const hasFilterMainType = filterMainType && filterMainType !== 'default';
  const hasFilterSecondType = filterSecondType && filterSecondType !== 'default';

  if (hasFilterCountry && hasFilterMainType && hasFilterSecondType) {
    sqlCount = `
      SELECT COUNT(*) AS numbers
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted' AND country=? AND mainType=? AND secondType=?
      ;`;
    sql = `
      SELECT ofs.*, acc.username, acc.profilePicPath, acc.introduction, acc.introductionEN, acc.languages, ofs.isAnonymous, acc.id AS helperId
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted' AND country=? AND mainType=? AND secondType=?
      ORDER BY score, id DESC
      LIMIT 10 OFFSET ?;`;
    allOffersCount = await query(sqlCount, [
      filterCountry,
      filterMainType,
      filterSecondType,
      offset,
    ]);
    allMKTOffers = await query(sql, [
      filterCountry,
      filterMainType,
      filterSecondType,
      offset,
    ]);
  } else if (!hasFilterCountry && !hasFilterMainType && !hasFilterSecondType) {
    sqlCount = `
      SELECT COUNT(*) AS numbers
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted'
      ;`;
    sql = `
      SELECT ofs.*, acc.username, acc.profilePicPath, acc.introduction, acc.introductionEN, acc.languages, ofs.isAnonymous, acc.id AS helperId
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted'
      ORDER BY score, id DESC
      LIMIT 10 OFFSET ?;`;
    allOffersCount = await query(sqlCount, [offset]);
    allMKTOffers = await query(sql, [offset]);
  } else if (hasFilterCountry && !hasFilterMainType && !hasFilterSecondType) {
    sqlCount = `
      SELECT COUNT(*) AS numbers
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted' AND country=?
      ;`;
    sql = `
      SELECT ofs.*, acc.username, acc.profilePicPath, acc.introduction, acc.introductionEN, acc.languages, ofs.isAnonymous, acc.id AS helperId
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted' AND country=?
      ORDER BY score, id DESC
      LIMIT 10 OFFSET ?;`;
    allOffersCount = await query(sqlCount, [filterCountry, offset]);
    allMKTOffers = await query(sql, [filterCountry, offset]);

  } else if (!hasFilterCountry && hasFilterMainType && !hasFilterSecondType) {
    sqlCount = `
      SELECT COUNT(*) AS numbers
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted' AND mainType=?
      ;`;
    sql = `
      SELECT ofs.*, acc.username, acc.profilePicPath, acc.introduction, acc.introductionEN, acc.languages, ofs.isAnonymous, acc.id AS helperId
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted' AND mainType=?
      ORDER BY score, id DESC
      LIMIT 10 OFFSET ?;`;
    allOffersCount = await query(sqlCount, [filterMainType, offset]);
    allMKTOffers = await query(sql, [filterMainType, offset]);

  } else if (!hasFilterCountry && !hasFilterMainType && hasFilterSecondType) {
    sqlCount = `
      SELECT COUNT(*) AS numbers
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted' AND secondType=?
      ;`;
    sql = `
      SELECT ofs.*, acc.username, acc.profilePicPath, acc.introduction, acc.introductionEN, acc.languages, ofs.isAnonymous, acc.id AS helperId
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted' AND secondType=?
      ORDER BY score, id DESC
      LIMIT 10 OFFSET ?;`;
    allOffersCount = await query(sqlCount, [filterSecondType, offset]);
    allMKTOffers = await query(sql, [filterSecondType, offset]);

  } else if (hasFilterCountry && hasFilterMainType && !hasFilterSecondType) {
    sqlCount = `
      SELECT COUNT(*) AS numbers
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted' AND country=? AND mainType=? 
      ;`;
    sql = `
      SELECT ofs.*, acc.username, acc.profilePicPath, acc.introduction, acc.introductionEN, acc.languages, ofs.isAnonymous, acc.id AS helperId
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted' AND country=? AND mainType=? 
      ORDER BY score, id DESC
      LIMIT 10 OFFSET ?;`;
    allOffersCount = await query(sqlCount, [
      filterCountry,
      filterMainType,
      offset,
    ]);
    allMKTOffers = await query(sql, [filterCountry, filterMainType, offset]);

  } else if (hasFilterCountry && !hasFilterMainType && hasFilterSecondType) {
    sqlCount = `
      SELECT COUNT(*) AS numbers
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted' AND country=? AND secondType=?
      ;`;
    sql = `
      SELECT ofs.*, acc.username, acc.profilePicPath, acc.introduction, acc.introductionEN, acc.languages, ofs.isAnonymous, acc.id AS helperId
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted' AND country=? AND secondType=?
      ORDER BY score, id DESC
      LIMIT 10 OFFSET ?;`;
    allOffersCount = await query(sqlCount, [
      filterCountry,
      filterSecondType,
      offset,
    ]);
    allMKTOffers = await query(sql, [filterCountry, filterSecondType, offset]);

  } else if (!hasFilterCountry && hasFilterMainType && hasFilterSecondType) {
    sqlCount = `
      SELECT COUNT(*) AS numbers
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted' AND mainType=? AND secondType=?
      ;`;
    sql = `
      SELECT ofs.*, acc.username, acc.profilePicPath, acc.introduction, acc.introductionEN, acc.languages, ofs.isAnonymous, acc.id AS helperId
      FROM offers ofs 
      INNER JOIN helper_account acc ON ofs.userId = acc.id
      WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') AND NOT ofs.status='deleted' AND mainType=? AND secondType=?
      ORDER BY score, id DESC
      LIMIT 10 OFFSET ?;`;
    allOffersCount = await query(sqlCount, [
      filterMainType,
      filterSecondType,
      offset,
    ]);
    allMKTOffers = await query(sql, [filterMainType, filterSecondType, offset]);
  }
  const sqlForRating = `
  SELECT writerUsername, ratedPartnerId, score, comments
  FROM ratings
  WHERE ratedPartnerId IN (
  SELECT acc.id AS helperId
  FROM offers ofs 
  INNER JOIN helper_account acc ON ofs.userId = acc.id
  WHERE acc.isMarketing = true AND acc.internalStatus IN ('pass_eligibility_email_sent') 
    AND NOT ofs.status='deleted' 
  ) AND writerRole = 'helpee';
  `;
  const allMKTHelperRatings = await query(sqlForRating);
  return { data: { allOffersCount: 0 || allOffersCount[0].numbers, allMKTOffers, allMKTHelperRatings } };
}

async function getHelperAllBookings(data) {
  const { helperUserId } = data;
  const sql = ` 
  SELECT bookings.id AS bookingId,acc.languages, bookings.*, acc.profilePicPath AS profilePicPath
  , ofs.isAnonymous AS helpeeAnonymous, acc.introduction, acc.introductionEN, acc.username AS helpeeUsername
  , acc.languages, meet.joinUrl, ofs.notes, ofs.sharingTopicEN
  FROM bookings bookings
  LEFT JOIN offers ofs ON bookings.offerId = ofs.id
  LEFT JOIN helpee_account acc ON bookings.helpeeId = acc.id
  LEFT JOIN meetings meet ON bookings.id = meet.bookingId
  WHERE bookings.helperId = ? ORDER BY priorityScore DESC;`;
  const allBookings = await query(sql, helperUserId);
  return { data: { allBookings } };
}

async function getPotentialCustomers(data) { // maybe customer does NOT have request
  const { helperUserId } = data;
  const sql = ` SELECT DISTINCT req.organization AS organization
    , req.id AS requestId, ofs.id AS offerId
    , ofs.price AS price, ofs.duration AS duration, req.country AS country
    , acc.id AS helperId, acc.username AS helperUsername, ofs.isAnonymous AS helperAnonymous
    , req.userId AS helpeeId
    , helpee.username AS helpeeUsername, req.isAnonymous AS helpeeAnonymous, helpee.introduction, helpee.introductionEN
    , helpee.notificationLanguage
    , helpee.profilePicPath AS profilePicPath, helpee.languages, helpee.email AS helpeeEmail
    , req.mainType AS mainType, req.secondType AS secondType
    , req.thirdType AS thirdType, req.fourthType AS fourthType
    , req.notes, req.sharingTopicEN
    FROM offers ofs
LEFT JOIN helper_account acc ON ofs.userId = acc.id
LEFT JOIN requests req ON 
		    ofs.mainType = req.mainType AND ofs.secondType = req.secondType
        AND ofs.country = req.country
LEFT JOIN helpee_account helpee ON req.userId = helpee.id
WHERE acc.id = ? AND NOT req.userId IS NULL AND NOT req.status='deleted' AND NOT ofs.status='deleted'
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
    username,
    introduction,
    introductionEN,
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
    status,
    notificationLanguage,
  } = data;
  // get if status is approved
  let newStatus;
  const sql1 = `SELECT status FROM helper_account WHERE id =? LIMIT 1`;
  const sqlquery1 = await query(sql1, userId);
  const existingStatus = sqlquery1[0].status || '';
  if (existingStatus === 'approved') {
    newStatus = 'approved';
  } else {
    newStatus = status;
  }
  // update status
  const sql2 = `
    UPDATE helper_account SET introduction=?, introductionEN=?
    , nationality=?, residenceCountry=?
    , isAnonymous=?, isMarketing=?
    , certificatePath = ?, age = ?, linkedInUrl = ?, notes = ?, status= ?
    , hasMonToFri=?, hasWeekend=?, hasBefore12=?, has12To18=?, hasAfter18=?
      ,hasEnglish=?, hasGerman=?, hasFrench=?, hasItalien=?
      ,hasChinese=?, hasCantonese=?, hasVietnamese=?
      ,hasKorean=?, hasJapanese=?, hasTurkish=?, hasUkrainian=?
      ,hasArabic=?, hasOthers=?, languages=?
      , notificationLanguage=?, username=?
    WHERE id =?`;
  const sqlquery2 = await query(sql2, [
    introduction,
    introductionEN,
    nationality,
    residenceCountry,
    isAnonymous,
    isMarketing,
    path || 'No Path',
    age,
    linkedInUrl || 'No LinkedinURL',
    notes,
    newStatus,
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
  return sqlquery2;
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
  // Helpees often do not have request created, but book helper directly. Hence, would not anchor request for anonymous option
  const sql = `SELECT DISTINCT chat.helperId AS helperId, helper.username AS helperUsername
  , helpee.username AS helpeeUsername
  , helpee.id AS helpeeId, helpee.profilePicPath
  , helpee.introduction, helpee.introductionEN, helpee.languages, req.isAnonymous AS helpeeAnonymous
  , chat.offerId, ofs.*
FROM shelpydb.offers ofs
INNER JOIN shelpydb.chat_history chat ON ofs.userId = chat.helperId AND chat.offerId = ofs.id
INNER JOIN shelpydb.helper_account helper ON chat.helperId = helper.id
INNER JOIN shelpydb.helpee_account helpee ON chat.helpeeId = helpee.id
LEFT JOIN shelpydb.requests req ON ofs.mainType = req.mainType AND ofs.secondType = req.secondType
        AND ofs.country = req.country
WHERE ofs.id IN (SELECT offerId FROM shelpydb.chat_history WHERE helperId =?) AND helperId=?;`; // offers that chatted
  const allChattedCustomers = await query(sql, [helperUserId, helperUserId]);
  return { data: { allChattedCustomers } };
}

async function getHelperData(data) {
  const sqlSimplified = ` SELECT *
  FROM helper_account
  WHERE id=? LIMIT 1;`;
  const helperData = await query(sqlSimplified, data.helperUserId);
  return { data: { helperData } };
}

async function getHelperRatings(data) {
  const sqlSimplified = ` SELECT writerUsername, score, comments
  FROM ratings
  WHERE ratedPartnerId=? AND writerRole='helpee' ORDER BY id DESC;`;
  const helperRatingData = await query(sqlSimplified, data.helperUserId);
  return { data: { helperRatingData } };
}

module.exports = {
  insertHelperOffer,
  getHelperAllOffers,
  getHelperSingleOffer,
  updateHelperProfilePicPath,
  updateHelperCertificatePath,
  deleteHelperOffer,
  getPotentialCustomers,
  confirmHelperEmail,
  getHelperAllBookings,
  getAllMarketingOffers,
  getAllChattedCustomers,
  getHelperData,
  getHelperRatings,
  updateHelperOffer,
};
