const { query } = require('../query');

async function insertLoginHelpee(req) {
  const { email } = req.body;
  const sql = `SELECT id, provider, username, email, encryptpass, ivString FROM politicmotion.user_basic WHERE email = '${email}'`;
  const userLoginInput = await query(sql);
  return userLoginInput;
}

module.exports = {
  insertLoginHelpee,
};
