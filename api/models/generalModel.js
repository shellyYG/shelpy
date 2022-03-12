const { query } = require('./query');

async function getReceiverEmail(data) {
  // Find customers who once chatted with you
  const table = data.role === 'helper'? 'helper_account' : 'helpee_account'
  const sql = `SELECT email FROM ${table} WHERE id=? LIMIT 1;`;
  const user = await query(sql, data.id);
  return { email: user[0].email} ;
}

async function logEmailToDB(data) {
  const sql = 'INSERT INTO email_notifications SET ?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

module.exports = {
  getReceiverEmail,
  logEmailToDB,
};
