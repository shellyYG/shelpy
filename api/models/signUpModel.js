const { query } = require('./query');

async function checkEmailExist(data) {
  const table = data.isHelpee? 'helpee_account': 'helper_account';
  const sql = `SELECT * FROM ${table} WHERE email = '${data.email}'`;
  const sqlquery = await query(sql);
  return sqlquery;
}

async function insertUserAndGetUserId(data) {
  const insertedData = {
    provider: 'native',
    email: data.email,
    status: data.status,
    encryptedpass: data.password,
    ivString: data.ivString,
  };
  const table = data.isHelpee ? 'helpee_account' : 'helper_account';
  const sql = `INSERT INTO ${table} SET ?`;
  const sqlResult = await query(sql, insertedData);
  return sqlResult.insertId;
}

async function getUserIdByEmail(data) {
  const table = data.isHelpee ? 'helpee_account' : 'helper_account';
  const sql = `SELECT id FROM ${table} WHERE email = '${data.email}'`;
  const sqlResult = await query(sql);
  return { userId: sqlResult[0].id };
}

async function getUserAccountData(data, userId) {
  const table = data.isHelpee ? 'helpee_account' : 'helper_account';
  const sql = `SELECT id, provider, username, email, encryptpass FROM ${table} WHERE id =${userId}`;
  const userData = await query(sql);
  return userData;
}


module.exports = {
  checkEmailExist,
  insertUserAndGetUserId,
  getUserIdByEmail,
  getUserAccountData,
};
