const { query } = require('./query');

async function checkBookingExisted(data) {
  const { requestId, offerId } = data;
  const sql = `SELECT * FROM bookings WHERE requestId = ${requestId} AND offerId = ${offerId}`;
  const sqlquery = await query(sql);
  return sqlquery;
}

async function insertBooking(data) {
  const sql = 'INSERT INTO bookings SET ?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

async function updateBookingStatus(data) {
  let sql;
  const {
    requestId,
    offerId,
    bookingStatus,
    appointmentDate,
    appointmentTime,
    appointmentTimestamp,
    notes,
    bookingId
  } = data;
  const filteredBookingNotes = notes || '';
    if (
      (appointmentDate && appointmentTime && appointmentTimestamp)
    ) {
      sql = `
        UPDATE bookings SET bookingStatus = '${bookingStatus}', appointmentDate = '${appointmentDate}', appointmentTime = '${appointmentTime}', appointmentTimeStamp = '${appointmentTimestamp}', notes='${filteredBookingNotes}' WHERE requestId = ${requestId} AND offerId = ${offerId}`;
    } else {
      sql = `
        UPDATE bookings SET bookingStatus = '${bookingStatus}' WHERE id = ${bookingId}`;
    }
    const sqlquery = await query(sql);
    return sqlquery;
}

async function unsubscribeEmail(data) {
  const table = data.isHelpee ? 'helpee_account' : 'helper_account';
  const sql = `UPDATE ${table} SET subscribed=${false} WHERE email='${data.email}'`;
  const sqlquery = await query(sql);
  return sqlquery;
}

module.exports = {
  checkBookingExisted,
  insertBooking,
  updateBookingStatus,
  unsubscribeEmail,
};