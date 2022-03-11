const { query } = require('./query');

const DBName = 'shelpydb';

async function searchHistory(roomId) {
  const sql = `SELECT * FROM chat_history 
    WHERE roomId = ?
    ORDER BY messageTime ASC;`;
  const sqlquery = await query(sql, roomId);
  return sqlquery;
}
async function saveMsg(msgPackage) {
  const sql = 'INSERT INTO chat_history SET ?';
  const sqlquery = await query(sql, msgPackage);
  return sqlquery;
}

async function updateMsg(msgPackage) {
  const sql =
    'UPDATE chat_history SET messageReceived=? WHERE roomId=? AND messageTime=?';
  const sqlquery = await query(sql, [
    true,
    msgPackage.roomId,
    msgPackage.messageTime,
  ]);
  return sqlquery;
}

module.exports = {
  searchHistory,
  saveMsg,
  updateMsg,
};
