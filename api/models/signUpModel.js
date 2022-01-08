const { query } = require('./query');

async function checkEmailExist(data) {
  console.log('checkEmailExist data: ', data);
  const table = data.isHelpee? 'helpee_account': 'helper_account';
  const sql = `SELECT * FROM ${table} WHERE email = '${data.email}'`;
  const sqlquery = await query(sql);
  return sqlquery;
}

async function insertUser(data, encryptedpass, ivString) {
    const { email, status } = data;
  const insertedData = {
    provider: 'native',
    email,
    encryptedpass,
    ivString,
    status,
  };
  const table = data.isHelpee ? 'helpee_account' : 'helper_account';
  const sql = `INSERT INTO ${table} SET ?`;
  const sqlquery = await query(sql, insertedData);
  return sqlquery;
}

async function getLatestUserId(data, encryptedpass, ivString) {
  const insertUserResult = await insertUser(
    data,
    encryptedpass,
    ivString,
  );
  const latestUserId = insertUserResult.insertId;
  return latestUserId;
}

async function getUserRawAttributeAfterInsert(
  data,
  encryptedpass,
  ivString,
) {
  if (data.email && !encryptedpass) { // only on HOME page
      const insertedData = {
        provider: 'native',
        email: data.email,
        status: data.status,
      };
    const table = data.isHelpee ? 'helpee_account' : 'helper_account';
    const sql = `INSERT INTO ${table} SET ?`;
    await query(sql, insertedData);
  }
  const userId = await getLatestUserId(
    data,
    encryptedpass,
    ivString,
  );
  const table = data.isHelpee ? 'helpee_account' : 'helper_account';
  const sqlUserAttri = `SELECT id, provider, username, email, encryptpass FROM ${table} WHERE id =${userId}`;
  const userAttribute = await query(sqlUserAttri);
  return userAttribute;
}

module.exports = {
  checkEmailExist,
  getUserRawAttributeAfterInsert,
};
