const { query } = require('./query');

async function insertHelpeeRequestFormAndGetId(data) { // old.
  const sql = 'INSERT INTO request_form SET?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

async function insertHelpeeRequest(data) { // new.
  const {
    helpeeUserId,
    type,
    globalHelpeeUniSchool,
    globalHelpeeUniDepartment,
    globalHelpeeUniCountry,
    globalHelpeeUniDegree,
    globalHelpeeUniNotes,

    globalHelpeeJobIndustry,
    globalHelpeeJobJob,
    globalHelpeeJobCountry,
    globalHelpeeJobWFH,
    globalHelpeeJobCompanySize,
    globalHelpeeJobYears,
    globalHelpeeJobNotes,

    globalHelpeeSelfEmployedType,
    globalHelpeeSelfEmployedProfession,
    globalHelpeeSelfEmployedCountry,
    globalHelpeeSelfEmployedYears,
    globalHelpeeSelfEmployedNotes,

    helpeeHasMonToFri,
    helpeeHasWeekend,

    helpeeHasBefore12,
    helpeeHas12To18,
    helpeeHasAfter18,

    helpeeHasEnglish,
    helpeeHasGerman,
    helpeeHasFrench,
    helpeeHasItalien,
    helpeeHasChinese,
    helpeeHasCantonese,
    helpeeHasVietnamese,
    helpeeHasKorean,
    helpeeHasJapanese,
    helpeeHasTurkish,
    helpeeHasUkrainian,
    helpeeHasArabic,
    helpeeHasOthers,

    finalNotes,

    step,
    status,
  } = data;

  let filteredData = {};
  switch (type) {
    case 'university':
      filteredData = {
        userId: helpeeUserId,
        mainType: type,
        secondType: globalHelpeeUniSchool,
        thirdType: globalHelpeeUniDepartment,
        timestamp: Date.now(),
        school: globalHelpeeUniSchool,
        department: globalHelpeeUniDepartment,
        country: globalHelpeeUniCountry,
        degree: globalHelpeeUniDegree,
        notes: globalHelpeeUniNotes,
        hasMonToFri: helpeeHasMonToFri,
        hasWeekend: helpeeHasWeekend,

        hasBefore12: helpeeHasBefore12,
        has12To18: helpeeHas12To18,
        hasAfter18: helpeeHasAfter18,

        hasEnglish: helpeeHasEnglish,
        hasGerman: helpeeHasGerman,
        hasFrench: helpeeHasFrench,
        hasItalien: helpeeHasItalien,
        hasChinese: helpeeHasChinese,
        hasCantonese: helpeeHasCantonese,
        hasVietnamese: helpeeHasVietnamese,
        hasKorean: helpeeHasKorean,
        hasJapanese: helpeeHasJapanese,
        hasTurkish: helpeeHasTurkish,
        hasUkrainian: helpeeHasUkrainian,
        hasArabic: helpeeHasArabic,
        hasOthers: helpeeHasOthers,
        finalNotes,
        step,
        status,
      };
      break;
    case 'job':
      filteredData = {
        userId: helpeeUserId,
        mainType: type,
        secondType: globalHelpeeJobIndustry,
        thirdType: globalHelpeeJobJob,
        timestamp: Date.now(),
        industry: globalHelpeeJobIndustry,
        job: globalHelpeeJobJob,
        country: globalHelpeeJobCountry,
        WFH: globalHelpeeJobWFH,
        companySize: globalHelpeeJobCompanySize,
        years: globalHelpeeJobYears,
        notes: globalHelpeeJobNotes,
        hasMonToFri: helpeeHasMonToFri,
        hasWeekend: helpeeHasWeekend,

        hasBefore12: helpeeHasBefore12,
        has12To18: helpeeHas12To18,
        hasAfter18: helpeeHasAfter18,

        hasEnglish: helpeeHasEnglish,
        hasGerman: helpeeHasGerman,
        hasFrench: helpeeHasFrench,
        hasItalien: helpeeHasItalien,
        hasChinese: helpeeHasChinese,
        hasCantonese: helpeeHasCantonese,
        hasVietnamese: helpeeHasVietnamese,
        hasKorean: helpeeHasKorean,
        hasJapanese: helpeeHasJapanese,
        hasTurkish: helpeeHasTurkish,
        hasUkrainian: helpeeHasUkrainian,
        hasArabic: helpeeHasArabic,
        hasOthers: helpeeHasOthers,
        finalNotes,
        step,
        status,
      };
      break;
    case 'selfEmployed':
      filteredData = {
        userId: helpeeUserId,
        mainType: type,
        secondType: globalHelpeeSelfEmployedType,
        thirdType: globalHelpeeSelfEmployedProfession,
        timestamp: Date.now(),
        type: globalHelpeeSelfEmployedType,
        profession: globalHelpeeSelfEmployedProfession,
        country: globalHelpeeSelfEmployedCountry,
        years: globalHelpeeSelfEmployedYears,
        notes: globalHelpeeSelfEmployedNotes,
        hasMonToFri: helpeeHasMonToFri,
        hasWeekend: helpeeHasWeekend,

        hasBefore12: helpeeHasBefore12,
        has12To18: helpeeHas12To18,
        hasAfter18: helpeeHasAfter18,

        hasEnglish: helpeeHasEnglish,
        hasGerman: helpeeHasGerman,
        hasFrench: helpeeHasFrench,
        hasItalien: helpeeHasItalien,
        hasChinese: helpeeHasChinese,
        hasCantonese: helpeeHasCantonese,
        hasVietnamese: helpeeHasVietnamese,
        hasKorean: helpeeHasKorean,
        hasJapanese: helpeeHasJapanese,
        hasTurkish: helpeeHasTurkish,
        hasUkrainian: helpeeHasUkrainian,
        hasArabic: helpeeHasArabic,
        hasOthers: helpeeHasOthers,
        finalNotes,
        step,
        status,
      };
      break;
    default:
      break;
  }
  const sql = 'INSERT INTO requests SET?';
  const sqlResult = await query(sql, filteredData);
  return sqlResult.insertId;
}

async function getHelpeeAllOrders(data) {
  const sql = ` SELECT DISTINCT book.id AS bookingId, book.bookingStatus AS bookingStatus, 
  ofs.price AS price,
  book.offerId AS offerId, helper.id AS helperId, helper.username AS helperName,
  book.appointmentDate AS appointmentDate, book.appointmentTime AS appointmentTime,
  req.id AS id, req.mainType AS mainType, req.secondType AS secondType, req.thirdType AS thirdType,
  req.country AS country
  FROM requests req
  LEFT JOIN bookings book ON req.id = book.requestId
  INNER JOIN offers ofs ON req.userId = ofs.id AND req.mainType = ofs.mainType AND req.secondType = ofs.secondType AND req.country = ofs.country
  LEFT JOIN helper_account helper ON helper.id = ofs.userId
  WHERE req.userId=${data.helpeeUserId} ORDER BY req.id DESC;`;
  const allOrders = await query(sql);
  return { data: { allOrders } };
}

async function getPotentialHelpers(data) {
  const { helpeeUserId } = data;
  const sql = `SELECT DISTINCT bk.id AS bookingId, bk.bookingStatus AS bookingStatus, req.id AS requestId, ofs.id AS offerId, ofs.price AS price, acc.id AS helperId, acc.username AS helperName, acc.profilePicPath AS profilePicPath,
		req.mainType AS mainType, req.secondType AS secondType, req.thirdType AS thirdType, req.country AS country
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

async function updateHelpeeCertificatePath(data) {
  const {
    userId,
    introduction,
    username,
    isAnonymous,
    age,
    notes,
  } = data;
  const sql = `
    UPDATE helpee_account SET username = '${username}', introduction='${introduction}', isAnonymous=${isAnonymous}, age = '${age}', notes = '${notes}', status='basic_info_created' WHERE id = ${userId}`;
  const sqlquery = await query(sql);
  return sqlquery;
}

async function deleteHelpeeRequest(data) {
  const { requestId } = data;
  const sql = `UPDATE requests SET status='deleted' WHERE id=${requestId}`;
  await query(sql);
  return { data: { status: 'success' } };
}

module.exports = {
  insertHelpeeRequestFormAndGetId,
  insertHelpeeRequest,
  getHelpeeAllOrders,
  getHelpeeOrderHelperList,
  updateHelpeeProfilePicPath,
  updateHelpeeCertificatePath,
  getPotentialHelpers,
  deleteHelpeeRequest,
};
