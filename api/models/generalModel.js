const { query } = require('./query');

async function getChatroomReceiverEmail(data) {
  // Find customers who once chatted with you
  const table = data.role === 'helper'? 'helper_account' : 'helpee_account'
  const sql = `SELECT email, notificationLanguage FROM ${table} WHERE id=? LIMIT 1;`;
  const user = await query(sql, data.id);
  return {
    email: user[0].email,
    notificationLanguage: user[0].notificationLanguage,
  };
}

async function getBookingReceiverEmail(data) {
  const mainTable =
    data.role === 'helper' ? 'helper_account' : 'helpee_account';
  let sql, user;
  if (
    data.bookingId &&
    data.bookingId !== 'null' &&
    data.bookingId !== undefined &&
    data.bookingId !== 'undefined'
  ) {
    const bookingColumnToJoin =
      data.role === 'helper' ? 'helperId' : 'helpeeId';
    sql = `
    SELECT email, notificationLanguage
    FROM ${mainTable} a
    INNER JOIN bookings b ON a.id = b.${bookingColumnToJoin}
    WHERE b.id=? LIMIT 1;
    `;
    user = await query(sql, data.bookingId);
  } else {
    const joinedTable = data.role === 'helper' ? 'offers' : 'requests';
    sql = `
    SELECT email, notificationLanguage
    FROM ${mainTable} a
    INNER JOIN ${joinedTable} b ON a.id = b.userId
    WHERE b.id=? LIMIT 1;`;
    user = await query(sql, data.offerOrRequestId);
  }
  
  return {
    email: user[0].email,
    notificationLanguage: user[0].notificationLanguage,
  };
}

async function getBookingStatusChangeInitiatorName(data) {
  const mainTable =
    data.role === 'helper' ? 'helpee_account' : 'helper_account';
  const id = data.role === 'helper' ? data.helpeeId: data.helperId;
  const sql = `
    SELECT username
    FROM ${mainTable}
    WHERE id=? LIMIT 1;`;
  const user = await query(sql, id);
  return { username: user[0].username };
}

async function logEmailToDB(data) {
  const sql = 'INSERT INTO email_notifications SET ?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

async function updatePayPalAccount(data) {
  const { bankAccount, payPalReceiverName, status, id, role } = data;
  const table = role === 'helpee' ? 'helpee_account': 'helper_account';
  const sql = `UPDATE ${table} SET bankAccount=?, payPalReceiverName=?, status=? WHERE id=?`;
  await query(sql, [bankAccount, payPalReceiverName, status, id]);
  return { data: { id } };
}

async function logMeetingToEmail(data) {
  if (!data.meetingDetails) return;
  const {
    bookingId,
    subject,
    startDateTime,
    endDateTime,
    timeZone,
    joinUrl,
    meetingCode,
    helpeeId,
    helperId,
    helperEmail,
    helpeeEmail,
  } = data.meetingDetails;
  const dataToInsert = {
    bookingId,
    subject,
    startDateTime,
    endDateTime,
    timeZone,
    joinUrl,
    meetingCode,
    helpeeId,
    helperId,
    helperEmail,
    helpeeEmail,
  };
  const sql = 'INSERT INTO meetings SET ?';
  const sqlResult = await query(sql, dataToInsert);
  return sqlResult.insertId;
}

module.exports = {
  getChatroomReceiverEmail,
  getBookingReceiverEmail,
  getBookingStatusChangeInitiatorName,
  logEmailToDB,
  updatePayPalAccount,
  logMeetingToEmail,
};
