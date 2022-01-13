const { query } = require('./query');

const DBName = 'shelpydb';

async function getHelpeeInfo() {
  const sql = `SELECT * FROM ${DBName}.helpee_requests`;
  const sqlResult = await query(sql);
  return sqlResult;
}

async function insertHelpeeRequestFormAndGetId(data) {
  const sql = 'INSERT INTO request_form SET?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

module.exports = {
  getHelpeeInfo,
  insertHelpeeRequestFormAndGetId,
};
