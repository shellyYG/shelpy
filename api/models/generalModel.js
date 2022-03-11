const { query } = require('./query');

async function getUsersToNotifyAboutChat(data) {
  
  // Find customers who once chatted with you
  const sql = `SELECT DISTINCT chat.helperId AS helperId, helpee.username AS helpeeUsername, helpee.id AS helpeeId, helpee.profilePicPath, chat.offerId, ofs.*
FROM shelpydb.offers ofs
INNER JOIN shelpydb.chat_history chat ON ofs.userId = chat.helperId
INNER JOIN shelpydb.helpee_account helpee ON chat.helpeeId = helpee.id
WHERE ofs.id IN (SELECT offerId FROM shelpydb.chat_history WHERE helperId =?);`;
  const users = await query(sql);
  return { users };
}

module.exports = {
  getUsersToNotifyAboutChat,
};
