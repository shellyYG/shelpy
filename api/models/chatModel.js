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
    msgPackage.messageReceived,
    msgPackage.roomId,
    msgPackage.messageTime,
  ]);
  return sqlquery;
}

async function setLastOthersMsgAsRead(input) {
  console.log('input: ', input)
  const sql =
    `UPDATE shelpydb.chat_history AS t1
    INNER JOIN (SELECT MAX(id) AS id FROM shelpydb.chat_history WHERE roomId=? AND NOT senderId=?) AS t2 
    ON t1.id = t2.id
    SET t1.messageReceived=1;`;
  const sqlquery = await query(sql, [
    input.roomId,
    input.author,
  ]);
  return sqlquery;
}

module.exports = {
  searchHistory,
  saveMsg,
  updateMsg,
  setLastOthersMsgAsRead,
};
