const { query } = require('./query');

async function insertHelpeeRequestFormAndGetId(data) {
  const sql = 'INSERT INTO request_form SET?';
  const sqlResult = await query(sql, data);
  return sqlResult.insertId;
}

async function getAllOrders(data) {
  const allOrdersSQL = `SELECT * FROM shelpydb.request_form WHERE userId=${data.userId};`;
  const allOrders = await query(allOrdersSQL);
  
  return { data: { allOrders } };
}

module.exports = {
  insertHelpeeRequestFormAndGetId,
  getAllOrders,
};
