const { query } = require("../query");

async function insertLoginHelpee(req) {
  let email = req.body.email;
  let sql = `SELECT id, provider, username, email, encryptpass, ivString FROM politicmotion.user_basic WHERE email = '${email}'`;
  let userLoginInput = await query(sql);
  return userLoginInput;
}

module.exports = {
  insertLoginHelpee,
};
