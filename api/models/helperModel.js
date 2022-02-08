const { query } = require('./query');

async function insertHelperOffer(data) {
  const {
    helperUserId,
    type,
    globalHelperUniSchool,
    globalHelperUniDepartment,
    globalHelperUniCountry,
    globalHelperUniDegree,
    globalHelperUniNotes,

    globalHelperJobIndustry,
    globalHelperJobJob,
    globalHelperJobCountry,
    globalHelperJobWFH,
    globalHelperJobCompanySize,
    globalHelperJobYears,
    globalHelperJobNotes,

    globalHelperSelfEmployedType,
    globalHelperSelfEmployedProfession,
    globalHelperSelfEmployedCountry,
    globalHelperSelfEmployedYears,
    globalHelperSelfEmployedNotes,

    helperHasMonToFri,
    helperHasWeekend,

    helperHasBefore12,
    helperHas12To18,
    helperHasAfter18,

    helperHasEnglish,
    helperHasGerman,
    helperHasFrench,
    helperHasItalien,
    helperHasChinese,
    helperHasCantonese,
    helperHasVietnamese,
    helperHasKorean,
    helperHasJapanese,
    helperHasTurkish,
    helperHasUkrainian,
    helperHasArabic,
    helperHasOthers,

    price,
    finalNotes,

    step,
    status,
  } = data;

  let filteredData = {};
  switch (type) {
    case 'university':
      filteredData = {
        userId: helperUserId,
        price,
        mainType: type,
        secondType: globalHelperUniSchool,
        thirdType: globalHelperUniDepartment,
        timestamp: Date.now(),
        school: globalHelperUniSchool,
        department: globalHelperUniDepartment,
        country: globalHelperUniCountry,
        degree: globalHelperUniDegree,
        notes: globalHelperUniNotes,
        hasMonToFri: helperHasMonToFri,
        hasWeekend: helperHasWeekend,
        hasBefore12: helperHasBefore12,
        has12To18: helperHas12To18,
        hasAfter18: helperHasAfter18,
        hasEnglish: helperHasEnglish,
        hasGerman: helperHasGerman,
        hasFrench: helperHasFrench,
        hasItalien: helperHasItalien,
        hasChinese: helperHasChinese,
        hasCantonese: helperHasCantonese,
        hasVietnamese: helperHasVietnamese,
        hasKorean: helperHasKorean,
        hasJapanese: helperHasJapanese,
        hasTurkish: helperHasTurkish,
        hasUkrainian: helperHasUkrainian,
        hasArabic: helperHasArabic,
        hasOthers: helperHasOthers,
        finalNotes,
        step,
        status,
      };
      break;
    case 'job':
      filteredData = {
        userId: helperUserId,
        price,
        mainType: type,
        secondType: globalHelperJobIndustry,
        thirdType: globalHelperJobJob,
        timestamp: Date.now(),
        industry: globalHelperJobIndustry,
        job: globalHelperJobJob,
        country: globalHelperJobCountry,
        WFH: globalHelperJobWFH,
        companySize: globalHelperJobCompanySize,
        years: globalHelperJobYears,
        notes: globalHelperJobNotes,
        hasMonToFri: helperHasMonToFri,
        hasWeekend: helperHasWeekend,
        hasBefore12: helperHasBefore12,
        has12To18: helperHas12To18,
        hasAfter18: helperHasAfter18,
        hasEnglish: helperHasEnglish,
        hasGerman: helperHasGerman,
        hasFrench: helperHasFrench,
        hasItalien: helperHasItalien,
        hasChinese: helperHasChinese,
        hasCantonese: helperHasCantonese,
        hasVietnamese: helperHasVietnamese,
        hasKorean: helperHasKorean,
        hasJapanese: helperHasJapanese,
        hasTurkish: helperHasTurkish,
        hasUkrainian: helperHasUkrainian,
        hasArabic: helperHasArabic,
        hasOthers: helperHasOthers,
        finalNotes,
        step,
        status,
      };
      break;
    case 'selfEmployed':
      filteredData = {
        userId: helperUserId,
        price,
        mainType: type,
        secondType: globalHelperSelfEmployedType,
        thirdType: globalHelperSelfEmployedProfession,
        timestamp: Date.now(),
        type: globalHelperSelfEmployedType,
        profession: globalHelperSelfEmployedProfession,
        country: globalHelperSelfEmployedCountry,
        years: globalHelperSelfEmployedYears,
        notes: globalHelperSelfEmployedNotes,
        hasMonToFri: helperHasMonToFri,
        hasWeekend: helperHasWeekend,
        hasBefore12: helperHasBefore12,
        has12To18: helperHas12To18,
        hasAfter18: helperHasAfter18,
        hasEnglish: helperHasEnglish,
        hasGerman: helperHasGerman,
        hasFrench: helperHasFrench,
        hasItalien: helperHasItalien,
        hasChinese: helperHasChinese,
        hasCantonese: helperHasCantonese,
        hasVietnamese: helperHasVietnamese,
        hasKorean: helperHasKorean,
        hasJapanese: helperHasJapanese,
        hasTurkish: helperHasTurkish,
        hasUkrainian: helperHasUkrainian,
        hasArabic: helperHasArabic,
        hasOthers: helperHasOthers,
        finalNotes,
        step,
        status,
      };
      break;
    default:
      break;
  }
  const sql = 'INSERT INTO offers SET?';
  const sqlResult = await query(sql, filteredData);
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
  const sql = ` SELECT * FROM offers WHERE userId = ${helperUserId} AND NOT status='deleted' ORDER BY id DESC;`;
  const allOffers = await query(sql);
  return { data: { allOffers } };
}

async function getPotentialCustomers(data) {
  const { helperUserId } = data;
  const sql = ` SELECT DISTINCT bk.id AS bookingId, bk.bookingStatus AS bookingStatus, req.id AS requestId, ofs.id AS offerId, ofs.price AS price, req.userId AS helpeeId, helpee.username AS helpeeName, helpee.profilePicPath AS profilePicPath,
		req.mainType AS mainType, req.secondType AS secondType, req.thirdType AS thirdType, req.country AS country
FROM offers ofs
LEFT JOIN helper_account acc ON ofs.userId = acc.id
LEFT JOIN requests req ON 
		    ofs.mainType = req.mainType AND ofs.secondType = req.secondType AND ofs.thirdType = req.thirdType
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
  const { userId, introduction, username, isAnonymous, isMarketing, path, age, linkedInUrl, notes } = data;
  const sql = `
    UPDATE helper_account SET username = '${username}', introduction='${introduction}', isAnonymous=${isAnonymous}, isMarketing=${isMarketing}, certificatePath = '${path}', age = '${age}', linkedInUrl = '${linkedInUrl}', notes = '${notes}', status='resume_created' WHERE id = ${userId}`;
  const sqlquery = await query(sql);
  return sqlquery;
}

async function deleteHelperOffer(data) {
  const { offerId } = data;
  const sql = `UPDATE offers SET status='deleted' WHERE id=${offerId}`;
  await query(sql);
  return { data: { status: 'success'} };
}

module.exports = {
  insertHelperOffer,
  getHelperAllMatchedRequests,
  getHelperAllOffers,
  updateHelperProfilePicPath,
  updateHelperCertificatePath,
  deleteHelperOffer,
  getPotentialCustomers,
};
