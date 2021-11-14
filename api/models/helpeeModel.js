const { query } = require('./query');
const DBName = 'localhelps';

async function getHelpeeInfo() {
    const sql = `SELECT * FROM ${DBName}.helpeeInfo`; 
    const queryResult = await query(sql);
    return queryResult;
}
async function postHelpeeInfo(data) {
  const dataToInsert = {
      name: data.helpeeName,
      language: data.helpeeLanguage,
      service: data.serviceType
  }
  const sql = "INSERT INTO helpeeInfo SET?"; 
  const queryResult = await query(sql, dataToInsert);
  return queryResult;
}


module.exports = {
  getHelpeeInfo,
  postHelpeeInfo,
};