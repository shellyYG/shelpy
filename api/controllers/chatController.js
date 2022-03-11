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
  socket.on('message_received', (data) => {
    // receiver must be others not self because its mother event 'server_send_message' only emit to others except self
    const messageObj = {
      messageReceived: true,
      roomId: data.room,
      messageTime: data.messageTime,
    };
    chatModel.updateMsg(messageObj);
  });
  socket.on('set_last_others_msg_as_read', (data) => {
    console.log('set_last_others_msg_as_read');
    const messageObj = {
      roomId: data.roomId,
      author: data.author,
    };
    chatModel.setLastOthersMsgAsRead(messageObj);
  });
  socket.on('disconnect', (data) => {
    // console.log(`User ${socket.id} disconnected.`);
  });
};

module.exports = socketChat;
