const chatModel = require('../models/chatModel');

const socketChat = async (socket) => {
  console.log(`User ${socket.id} conneted...`);
  socket.on('join_room', async (roomId) => {
    socket.join(roomId);
    const data = await chatModel.searchHistory(roomId);
    const history = data.map((d) => {
      const newObj = {
        id: d.id,
        room: d.room_id,
        author: d.sender_id,
        message: d.message,
        message_time: d.message_time,
      };
      return newObj;
    });
    socket.emit('history', history); // emit history
  });
  socket.on('send_message', (data) => {
    socket.to(data.room).emit('server_send_message', data); // emit to others except self
    // save to DB
    const messageObj = {
      room_id: data.room,
      sender_id: data.author,
      message: data.message,
      message_time: data.message_time,
    };
    chatModel.saveMsg(messageObj);
  });
  socket.on('disconnect', (data) => {
    console.log(`User ${socket.id} disconnected.`);
  });
};

module.exports = socketChat;
