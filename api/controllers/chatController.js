const chatModel = require('../models/chatModel');

const socketChat = async (socket) => {
  // console.log(`User ${socket.id} conneted...`);
  socket.on('join_room', async (roomId) => {
    socket.join(roomId);
    const data = await chatModel.searchHistory(roomId);
    const history = data.map((d) => {
      const newObj = {
        id: d.id,
        room: d.roomId,
        author: d.senderId,
        message: d.message,
        messageTime: d.messageTime,
      };
      return newObj;
    });
    socket.emit('history', history); // emit history
  });
  socket.on('send_message', (data) => {
    socket.to(data.room).emit('server_send_message', data); // emit to others except self
    // save to DB
    const messageObj = {
      roomId: data.room,
      senderId: data.author,
      helperId: data.helperId,
      helpeeId: data.helpeeId,
      offerId: data.offerId,
      message: data.message,
      messageTime: data.messageTime,
    };
    chatModel.saveMsg(messageObj);
  });
  socket.on('disconnect', (data) => {
    // console.log(`User ${socket.id} disconnected.`);
  });
};

module.exports = socketChat;
