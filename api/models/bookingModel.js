const { query } = require('./query');

async function checkBookingExisted(data) {
  const { requestId, offerId } = data;
  // what about recurring booking? --> if fulfilled then can have another booking
  const sql = `SELECT * FROM bookings WHERE requestId =? AND offerId =? AND NOT bookingStatus='fulfilled'`;
  const sqlquery = await query(sql, [requestId, offerId]);
  return sqlquery;
}

async function checkBookingStatus(data) {
  const { bookingId } = data;
  const sql = `SELECT bookingStatus FROM bookings WHERE id =?`;
  const sqlquery = await query(sql, [bookingId]);
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
    bookingStatus,
    appointmentDate,
    appointmentTime,
    timeZone,
    appointmentTimestamp,
    questions,
    bookingId,
    paidDetails,
  } = data;
  if (bookingStatus === 'paid' && !paidDetails) {
    return;
  }
  let sqlquery = '';
  const filteredBookingQuestions = questions || '';
    if (
      (appointmentDate && appointmentTime && appointmentTimestamp && timeZone)
    ) {
      sql = `
        UPDATE bookings SET bookingStatus =? , appointmentDate =?, appointmentTime =?, appointmentTimeStamp =?, questions=?, timeZone=? WHERE id=?`;
        sqlquery = await query(sql, [
          bookingStatus,
          appointmentDate,
          appointmentTime,
          appointmentTimestamp,
          filteredBookingQuestions,
          timeZone,
          bookingId,
        ]);
    } else if (paidDetails) {
      sql = `
        UPDATE bookings SET bookingStatus =?, paidDetails=?  WHERE id =?`;
      sqlquery = await query(sql, [bookingStatus, paidDetails, bookingId]);
    }else {
      sql = `
        UPDATE bookings SET bookingStatus =? WHERE id =?`;
      sqlquery = await query(sql, [bookingStatus, bookingId]);
    }
    return sqlquery;
}

async function unsubscribeEmail(data) {
  const table = data.isHelpee ? 'helpee_account' : 'helper_account';
  const sql = `UPDATE ${table} SET subscribed=${false} WHERE email=?`;
  const sqlquery = await query(sql, data.email);
  return sqlquery;
}

async function ratePartner(data) {
  let id;
  const findRatingSQL = `SELECT * FROM ratings WHERE bookingId =? AND writerRole =?`;
  const findRatingResult = await query(findRatingSQL, [
    data.bookingId,
    data.writerRole,
  ]);
  if (findRatingResult.length > 0) {
    id = findRatingResult[0].id;
    const sql = `UPDATE ratings SET score=?, comments=? WHERE id=?`;
    await query(sql, [data.score, data.comments, id]);
    id = findRatingResult[0].id;
  } else {
    const sql = 'INSERT INTO ratings SET ?';
    const sqlResult = await query(sql, data);
    id = sqlResult.insertId;
  }
  return id;
}

module.exports = {
  checkBookingExisted,
  checkBookingStatus,
  insertBooking,
  updateBookingStatus,
  unsubscribeEmail,
  ratePartner,
};