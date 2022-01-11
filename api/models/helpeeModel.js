const { query } = require('./query');

const DBName = 'shelpydb';

async function getHelpeeInfo() {
  const sql = `SELECT * FROM ${DBName}.helpee_requests`;
  const queryResult = await query(sql);
  console.log(`queryResult: ${queryResult}`);
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
  postHelpeeServiceRequestForm,
};
