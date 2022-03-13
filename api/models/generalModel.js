const { query } = require('./query');

async function getChatroomReceiverEmail(data) {
  // Find customers who once chatted with you
  const table = data.role === 'helper'? 'helper_account' : 'helpee_account'
  const sql = `SELECT email FROM ${table} WHERE id=? LIMIT 1;`;
  const user = await query(sql, data.id);
  return { email: user[0].email} ;
}

async function getBookingReceiverEmail(data) {
  console.log('getBookingReceiverEmail data: ', data);
  const mainTable =
    data.role === 'helper' ? 'helper_account' : 'helpee_account';
  let sql, user;
  if (data.bookingId) {
    const bookingColumnToJoin = data.role === 'helper' ? 'helperId': 'helpeeId';
    sql = `
    SELECT email 
    FROM ${mainTable} a
    INNER JOIN bookings b ON a.id = b.${bookingColumnToJoin}
    WHERE b.id=? LIMIT 1;
    `;
    user = await query(sql, data.bookingId);
  } else {
    const joinedTable = data.role === 'helper' ? 'offers' : 'requests';
    sql = `
    SELECT email
    FROM ${mainTable} a
    INNER JOIN ${joinedTable} b ON a.id = b.userId
    WHERE b.id=? LIMIT 1;`;
    user = await query(sql, data.offerOrRequestId);
  }
  
  return { email: user[0].email };
}

async function getBookingStatusChangeInitiatorName(data) {
  console.log('getBookingStatusChangeInitiatorName data: ', data);
  const mainTable =
    data.role === 'helper' ? 'helpee_account' : 'helper_account';
  const joinedTable = data.role === 'helper' ? 'requests' : 'offers';
  const sql = `
    SELECT a.username
    FROM ${mainTable} a
    INNER JOIN ${joinedTable} b ON a.id = b.userId
    WHERE b.id=? LIMIT 1;`;
  const user = await query(sql, data.offerOrRequestId);
  return { username: user[0].username };
}

async function logEmailToDB(data) {
  const sql = 'INSERT INTO email_notifications SET ?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

module.exports = {
  getChatroomReceiverEmail,
  getBookingReceiverEmail,
  getBookingStatusChangeInitiatorName,
  logEmailToDB,
};
