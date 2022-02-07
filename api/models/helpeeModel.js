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
  const sql = `SELECT * FROM requests WHERE userId=${data.helpeeUserId} ORDER BY id DESC;`;
  const allOrders = await query(sql);
  return { data: { allOrders } };
}


async function getHelpeeOrderHelperList(data) {
  const { orderId } = data;
  const sql = `
    SELECT DISTINCT a.id AS helperId, a.username, a.nationality, a.nativeLanguage, a.firstLanguage, a.secondLanguage
    FROM helper_account a
    INNER JOIN helper_accept_request b ON a.id = b.helperId
    WHERE b.orderId = ${orderId};`;
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

module.exports = {
  insertHelpeeRequestFormAndGetId,
  insertHelpeeRequest,
  getHelpeeAllOrders,
  getHelpeeOrderHelperList,
  updateHelpeeProfilePicPath,
  updateHelpeeCertificatePath,
};
