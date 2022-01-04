const { query } = require('./query');

const DBName = 'shelpydb';

async function searchHistory(roomId) {
  sql = `SELECT * FROM chat_history 
    WHERE room_id = '${roomId}'
    ORDER BY message_time ASC;`;
  const sqlquery = await query(sql);
  return sqlquery;
}
async function saveMsg(msgPackage) {
  sql = 'INSERT INTO chat_history SET ?';
  const sqlquery = await query(sql, msgPackage);
  return sqlquery;
}

module.exports = {
  searchHistory,
  saveMsg,
};
