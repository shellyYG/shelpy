const chatModel = require('../models/chatModel');
const onlineUsers = {};

const socketChat = async (socket) => {
  console.log(`User ${socket.id} conneted...`);
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
    if (!onlineUsers[roomId]) {
      onlineUsers[roomId] = [];
    }
    if (
      onlineUsers[roomId] &&
      onlineUsers[roomId].indexOf(socket.id) === -1
    ) {
      onlineUsers[roomId].push(socket.id);
    }
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
    if (!onlineUsers[data.room]) {
      onlineUsers[data.room] = [];
    }
    if (
      onlineUsers[data.room] &&
      onlineUsers[data.room].indexOf(socket.id) === -1
    ) {
      onlineUsers[data.room].push(socket.id);
    }
    if (onlineUsers[data.room] && onlineUsers[data.room].length <= 1) {
      // send email
      if (data.author.substring(0,6)==='helper') {
        console.log('send email to helpee: ', data.helpeeId); // TODO
      } else if (data.author.substring(0, 6) === 'helpee') {
        console.log('sending email to helper ', data.helperId); // TODO
      }
        
    }
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
    const messageObj = {
      roomId: data.roomId,
      author: data.author,
    };
    chatModel.setLastOthersMsgAsRead(messageObj);
  });
  socket.on('disconnect', (data) => {
    console.log(`User ${socket.id} disconnected.`);
    for (const [key, socketIds] of Object.entries(onlineUsers)) {
      if (socketIds.length && socketIds.length > 0) {
        for (let i = 0; i < socketIds.length; i++) {
          if (socketIds[i] === socket.id) {
            socketIds.splice(i, 1); // 2nd parameter means remove one item only
          }
        }
      }
    }
  });
};

module.exports = socketChat;
