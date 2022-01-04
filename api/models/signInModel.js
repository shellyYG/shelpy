const { query } = require('./query');

async function postHelpeeSignInData(data) {
  const dataToInsert = {
    provider: 'native',
    email: data.helpeeEmail,
    sign_up_status: 'signed_in',
    encryptpass: data.helpeeEmail,
    ivString: '',
  };
  const sql = 'INSERT INTO helpee_account SET?'; // TODO: should be SELECT rather than INSERT
  const queryResult = await query(sql, dataToInsert);
  return queryResult;
}

module.exports = {
  postHelpeeSignInData,
};
