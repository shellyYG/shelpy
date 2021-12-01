const { query } = require('./query');
const DBName = "shelpydb";

async function getHelpeeInfo() {
    const sql = `SELECT * FROM ${DBName}.helpee_requests`; 
    const queryResult = await query(sql);
    console.log(`queryResult: ${queryResult}`)
    return queryResult;
}
async function postHelpeeSignUpEmail(data) {
  const dataToInsert = {
    email: data.helpeeEmail,
    sign_up_status: 'email_submitted',
  };
  const sql = "INSERT INTO helpee_account SET?"; 
  const queryResult = await query(sql, dataToInsert);
  return queryResult;
}


module.exports = {
  getHelpeeInfo,
  postHelpeeSignUpEmail,
};