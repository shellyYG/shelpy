const { query } = require('./query');

async function insertHelpeeRequestFormAndGetId(data) { // old.
  const sql = 'INSERT INTO request_form SET?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

async function insertHelpeeRequest(data) { // new.
  const { 
    userId,
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
        userId,
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
        userId,
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
        userId,
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

async function getAllOrders(data) {
  const sql = `SELECT * FROM requests WHERE userId=${data.userId} ORDER BY id DESC;`;
  const allOrders = await query(sql);
  return { data: { allOrders } };
}


async function getHelperList(data) {
  const { orderId } = data;
  const sql = `
    SELECT DISTINCT a.id AS helperId, a.username, a.nationality, a.nativeLanguage, a.firstLanguage, a.secondLanguage
    FROM helper_account a
    INNER JOIN helper_accept_request b ON a.id = b.helperId
    WHERE b.orderId = ${orderId};`;
  const sqlResult = await query(sql);
  return { data: { helpers: sqlResult } };
}

module.exports = {
  insertHelpeeRequestFormAndGetId,
  insertHelpeeRequest,
  getAllOrders,
  getHelperList,
};
