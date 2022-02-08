const { query } = require('./query');

async function checkBookingExisted(data) {
  const { requestId, offerId } = data;
  const sql = `SELECT * FROM bookings WHERE requestId = ${requestId} AND offerId = ${offerId}`;
  const sqlquery = await query(sql);
  return sqlquery;
}

async function insertBooking(data) {
  const {
    requestId,
    offerId,
    bookingStatus,
    appointmentDate,
    appointmentTime,
    appointmentTimestamp,
    notes,
  } = data;
  const insertedData = {
    requestId,
    offerId,
    appointmentDate,
    appointmentTime,
    appointmentTimestamp,
    notes,
    bookingStatus,
  };
  console.log('insertedData: ', insertedData);
  const sql = 'INSERT INTO bookings SET ?';
  const sqlResult = await query(sql, insertedData);
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
  } = data;
  console.log('data: ', data);
  const filteredBookingNotes = notes || '';
    if (
      (appointmentDate && appointmentTime && appointmentTimestamp)
    ) {
      console.log('YES');
      sql = `
        UPDATE bookings SET bookingStatus = '${bookingStatus}', appointmentDate = '${appointmentDate}', appointmentTime = '${appointmentTime}', appointmentTimeStamp = '${appointmentTimestamp}', notes='${filteredBookingNotes}' WHERE requestId = ${requestId} AND offerId = ${offerId}`;
    } else {
      sql = `
        UPDATE bookings SET bookingStatus = '${bookingStatus}' WHERE requestId = ${requestId} AND offerId = ${offerId}`;
    }
    console.log(sql);
    
    const sqlquery = await query(sql);
    return sqlquery;
}

module.exports = {
  checkBookingExisted,
  insertBooking,
  updateBookingStatus,
};