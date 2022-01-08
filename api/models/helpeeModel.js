const { query } = require('./query');

const DBName = 'shelpydb';

async function getHelpeeInfo() {
  const sql = `SELECT * FROM ${DBName}.helpee_requests`;
  const queryResult = await query(sql);
  console.log(`queryResult: ${queryResult}`);
  return queryResult;
}
async function postHelpeeSignUpEmail(data) {
  const dataToInsert = {
    provider: 'native',
    email: data.email,
    sign_up_status: 'email_submitted',
    encryptpass: '',
    ivString: '',
  };
  const sql = 'INSERT INTO helpee_account SET?';
  const queryResult = await query(sql, dataToInsert);
  return queryResult;
}
async function postHelpeeSignUpPassword(data) {
  const sql = `UPDATE helpee_account SET password_encoded='${data.password}', sign_up_status='password_created' WHERE email='${data.email}'`;
  const queryResult = await query(sql);
  return queryResult;
}

async function postHelpeeServiceRequestForm(data) {
  console.log('helpee data: ', data);
  const sql = 'INSERT INTO request_form SET?';
  const queryResult = await query(sql, data);
  return queryResult;
}

module.exports = {
  getHelpeeInfo,
  postHelpeeSignUpEmail,
  postHelpeeSignUpPassword,
  postHelpeeServiceRequestForm,
};
