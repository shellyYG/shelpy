const { query } = require('./query');

async function insertHelpeeRequestFormAndGetId(data) {
  const sql = 'INSERT INTO request_form SET?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

async function getAllOrders(data) {
  const activeOrdersSQL = `SELECT * FROM shelpydb.request_form WHERE NOT status = 'complete' AND userId=${data.userId};`;
  const completeOrdersSQL = `SELECT * FROM request_form WHERE status='complete' AND userId=${data.userId}`;
  const activeOrders = await query(activeOrdersSQL);
  const completeOrders = await query(completeOrdersSQL);
  return { data: { activeOrders, completeOrders } };
}

module.exports = {
  insertHelpeeRequestFormAndGetId,
  getAllOrders,
};
