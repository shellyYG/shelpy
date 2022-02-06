const { query } = require('./query');

async function insertHelperOffer(data) {
  const {
    helperUserId,
    type,
    globalHelperUniSchool,
    globalHelperUniDepartment,
    globalHelperUniCountry,
    globalHelperUniDegree,
    globalHelperUniNote,

    globalHelperJobIndustry,
    globalHelperJobJob,
    globalHelperJobCountry,
    globalHelperJobWFH,
    globalHelperJobCompanySize,
    globalHelperJobYears,
    globalJobNotes,

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
        timestamp: Date.now(),
        school: globalHelperUniSchool,
        department: globalHelperUniDepartment,
        country: globalHelperUniCountry,
        degree: globalHelperUniDegree,
        notes: globalHelperUniNote,
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
        timestamp: Date.now(),
        industry: globalHelperJobIndustry,
        job: globalHelperJobJob,
        country: globalHelperJobCountry,
        WFH: globalHelperJobWFH,
        companySize: globalHelperJobCompanySize,
        years: globalHelperJobYears,
        notes: globalJobNotes,
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
  const sql = `SELECT * FROM requests WHERE helperUserId=${data.helperUserId} ORDER BY id DESC;`;
  const allOrders = await query(sql);
  return { data: { allOrders } };
}

async function getHelperOrderHelperList(data) {
  const { orderId } = data;
  const sql = `
    SELECT DISTINCT a.id AS helperId, a.username, a.nationality, a.nativeLanguage, a.firstLanguage, a.secondLanguage
    FROM helper_account a
    INNER JOIN helper_accept_request b ON a.id = b.helperId
    WHERE b.orderId = ${orderId};`;
  const sqlResult = await query(sql);
  return { data: { helpers: sqlResult } };
}

async function updateHelperProfilePicPath(data) {
  const { userId, path } = data;
  const sql = `
    UPDATE helper_account SET profilePicPath = '${path}' WHERE id = ${userId}`;
  const sqlquery = await query(sql);
  return sqlquery;
}

async function updateHelperCertificatePath(data) {
  const { userId, username, isAnonymous, isMarketing, path, age, linkedInUrl, notes } = data;
  const sql = `
    UPDATE helper_account SET username = '${username}', isAnonymous=${isAnonymous}, isMarketing=${isMarketing}, certificatePath = '${path}', age = '${age}', linkedInUrl = '${linkedInUrl}', notes = '${notes}', status='resume_created' WHERE id = ${userId}`;
  const sqlquery = await query(sql);
  return sqlquery;
}

module.exports = {
  insertHelperOffer,
  getHelperAllMatchedRequests,
  getHelperOrderHelperList,
  updateHelperProfilePicPath,
  updateHelperCertificatePath,
};
