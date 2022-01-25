const { query } = require('./query');

async function insertHelpeeRequestFormAndGetId(data) {
  const sql = 'INSERT INTO request_form SET?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

async function getAllOrders(data) {
  const sql = `SELECT * FROM request_form WHERE userId=${data.userId};`;
  const sqlResult = await query(sql);
  return { data: { allOrders: sqlResult } };
}

async function getHelperList(data) {
  const sql = `
    SELECT DISTINCT a.id AS helperId, a.username, a.nationality, a.nativeLanguage, a.firstLanguage, a.secondLanguage
    FROM helper_account a
    INNER JOIN helper_accept_request b ON a.id = b.helperId
    WHERE b.orderId = ${data.orderId};`;
  const sqlResult = await query(sql);
  return { data: { helpers: sqlResult } };
}

module.exports = {
  insertHelpeeRequestFormAndGetId,
  getAllOrders,
  getHelperList,
};
