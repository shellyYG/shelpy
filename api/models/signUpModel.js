const { query } = require('./query');

async function checkUserEmailExist(data) {
  const table = data.isHelpee ? 'helpee_account' : 'helper_account';
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
    confirmed: false,
    score: 0,
    refId: data.refId,
    subscribed: data.subscribed
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
  const sql = `UPDATE ${table} SET encryptedpass='${password}', ivString='${ivString}'  WHERE email='${email}'`;
  await query(sql);
  const getIdSql = `SELECT id FROM ${table} WHERE email = '${email}'`;
  const sqlResult = await query(getIdSql);
  return sqlResult[0].id;
}


module.exports = {
  checkUserEmailExist,
  insertUserAndGetUserId,
  resetPassword,
};
