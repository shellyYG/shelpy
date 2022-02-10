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
  };
  const table = data.isHelpee ? 'helpee_account' : 'helper_account';
  const sql = `INSERT INTO ${table} SET ?`;
  const sqlResult = await query(sql, insertedData);
  return sqlResult.insertId;
}


module.exports = {
  checkUserEmailExist,
  insertUserAndGetUserId,
};
