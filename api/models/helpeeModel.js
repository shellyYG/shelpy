const { query } = require('./query');
const DBName = "shelpydb";

async function getHelpeeInfo() {
    const sql = `SELECT * FROM ${DBName}.helpee_requests`; 
    const queryResult = await query(sql);
    console.log(`queryResult: ${queryResult}`)
    return queryResult;
}
async function postHelpeeInfo(data) {
  console.log('start model post HelpeeInfo...');
  const dataToInsert = {
    username: data.helpeeName,
    gender: "Male",
    service_type: "Rathaus", // data.serviceType
    target_helper_gender: "Male",
    meet_date: "2021-01-01",
    meet_time: "8am-9am",
    meet_country: "Germany",
    meet_city: "Berlin",
    meet_address: "Landgrafering 300, 63333 Berlin",
    phone: "01111111111",
    native_language: "Chinese", // data.helpeeLanguage
    first_language: "English",
    notes: 'I speak Japanese.',
  };
  const sql = "INSERT INTO helpee_requests SET?"; 
  const queryResult = await query(sql, dataToInsert);
  return queryResult;
}


module.exports = {
  getHelpeeInfo,
  postHelpeeInfo,
};