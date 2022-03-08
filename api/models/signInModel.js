const { query } = require('./query');

async function getUserDataByEmail(data) {
  const table = data.isHelpee ? 'helpee_account' : 'helper_account';
  const sql = `SELECT id, provider, username, email, encryptedpass, ivString, confirmed, status FROM ${table} WHERE email = ?`;
  const queryResult = await query(sql, data.email);
  return queryResult;
}

module.exports = {
  getUserDataByEmail,
};
