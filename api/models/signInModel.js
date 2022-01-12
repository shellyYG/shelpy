const { query } = require('./query');

async function getUserDataByEmail(data) {
  const table = data.isHelpee ? 'helpee_account' : 'helper_account';
  const sql = `SELECT id, provider, username, email, encryptedpass, ivString FROM ${table} WHERE email = '${data.email}'`;
  const queryResult = await query(sql);
  return queryResult;
}

module.exports = {
  getUserDataByEmail,
};
