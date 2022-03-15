const { query } = require('./query');

async function checkUserEmailExist(data) {
  const table = data.isHelpee ? 'helpee_account' : 'helper_account';
  const sql = `SELECT * FROM ${table} WHERE email = ?`;
  const sqlquery = await query(sql, data.email);
  return sqlquery;
}

async function insertUserAndGetUserId(data) {
  const { username, email, status, password, ivString, refId, subscribed } = data;
  const insertedData = {
    provider: 'native',
    username,
    email,
    status,
    encryptedpass: password,
    ivString,
    confirmed: false,
    score: 0,
    refId,
    subscribed,
  };
  const table = data.isHelpee ? 'helpee_account' : 'helper_account';
  const sql = `INSERT INTO ${table} SET ?`;
  const sqlResult = await query(sql, insertedData);
  return sqlResult.insertId;
}

async function resetPassword(data) {
  const { email, password, ivString, isHelpee } = data;
  
  let table;
  if (isHelpee) {
    table = 'helpee_account';
  } else {
    table = 'helper_account';
  }
  const sql = `UPDATE ${table} SET encryptedpass=?, ivString=?  WHERE email=?`;
  await query(sql, [password, ivString, email]);
  const getIdSql = `SELECT id FROM ${table} WHERE email = '${email}'`;
  const sqlResult = await query(getIdSql);
  return sqlResult[0].id;
}


module.exports = {
  checkUserEmailExist,
  insertUserAndGetUserId,
  resetPassword,
};
