const { query } = require('./query');

async function insertHelperRequestFormAndGetId(data) {
  // old.
  const sql = 'INSERT INTO request_form SET?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

async function insertHelperRequest(data) {
  // new.
  const {
    helperUserId,
    type,
    globalUniSchool,
    globalUniDepartment,
    globalUniCountry,
    globalUniDegree,
    globalUniNote,

    globalJobIndustry,
    globalJobJob,
    globalJobCountry,
    globalJobWFH,
    globalJobCompanySize,
    globalJobYears,
    globalJobNotes,

    globalSelfEmployedType,
    globalSelfEmployedProfession,
    globalSelfEmployedCountry,
    globalSelfEmployedYears,
    globalSelfEmployedNotes,

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

    finalNotes,

    step,
    status,
  } = data;

  let filteredData = {};
  switch (type) {
    case 'university':
      filteredData = {
        helperUserId,
        mainType: type,
        timestamp: Date.now(),
        school: globalUniSchool,
        department: globalUniDepartment,
        country: globalUniCountry,
        degree: globalUniDegree,
        notes: globalUniNote,
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
        finalNotes,
        step,
        status,
      };
      break;
    case 'job':
      filteredData = {
        helperUserId,
        mainType: type,
        timestamp: Date.now(),
        industry: globalJobIndustry,
        job: globalJobJob,
        country: globalJobCountry,
        WFH: globalJobWFH,
        companySize: globalJobCompanySize,
        years: globalJobYears,
        notes: globalJobNotes,
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
        finalNotes,
        step,
        status,
      };
      break;
    case 'selfEmployed':
      filteredData = {
        helperUserId,
        mainType: type,
        timestamp: Date.now(),
        type: globalSelfEmployedType,
        profession: globalSelfEmployedProfession,
        country: globalSelfEmployedCountry,
        years: globalSelfEmployedYears,
        notes: globalSelfEmployedNotes,
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
  const { userId, username, path, age, linkedInUrl, notes } = data;
  const sql = `
    UPDATE helper_account SET username = '${username}', certificatePath = '${path}', age = '${age}', linkedInUrl = '${linkedInUrl}', notes = '${notes}', status='resume_created' WHERE id = ${userId}`;
  const sqlquery = await query(sql);
  return sqlquery;
}

module.exports = {
  insertHelperRequestFormAndGetId,
  insertHelperRequest,
  getHelperAllMatchedRequests,
  getHelperOrderHelperList,
  updateHelperProfilePicPath,
  updateHelperCertificatePath,
};
