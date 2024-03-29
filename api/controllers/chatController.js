const { sendChatMessageReminderEmail } = require('../../util/email');
const chatModel = require('../models/chatModel');
const generalModel = require('../models/generalModel');
const onlineUsers = {};

const socketChat = async (socket) => {
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
  
  socket.on('send_message', async (data) => {
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
    await chatModel.saveMsg(messageObj);
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
      let urlForPartner = '';
      try {
        if (data.author.substring(0, 6) === 'helper') {
          const emailRes = await generalModel.getChatroomReceiverEmail({
            role: 'helpee',
            id: data.helpeeId,
          });
          urlForPartner = data.queryString.replace(
            `userId=helper_${data.helperId}`,
            `userId=helpee_${data.helpeeId}`
          );
          urlForPartner = urlForPartner.replace(
            `&partnerName=${data.helpeeUsername}`,
            `&partnerName=${data.helperUsername}`
          );
          await sendChatMessageReminderEmail({
            role: 'helpee',
            id: data.helpeeId,
            message: data.message,
            urlForPartner,
            notificationLanguage: emailRes.notificationLanguage,
            receiverEmailAddress: emailRes.email,
            helpeeUsername: data.helpeeUsername,
            helperUsername: data.helperUsername,
          });
          await generalModel.logEmailToDB({
            receiverRole: 'helpee',
            receiverEmail: emailRes.email,
            emailType: 'chatroom_reminder',
            chatroomId: data.room,
            chatMessageContent: data.message,
            chatMessageTime: data.messageTime,
            emailSendTimestamp: Date.now(),
          });
        } else if (data.author.substring(0, 6) === 'helpee') {
          const emailRes = await generalModel.getChatroomReceiverEmail({
            role: 'helper',
            id: data.helperId,
          });
          urlForPartner = data.queryString.replace(
            `userId=helpee_${data.helpeeId}`,
            `userId=helper_${data.helperId}`
          );
          urlForPartner = urlForPartner.replace(
            `&partnerName=${data.helperUsername}`,
            `&partnerName=${data.helpeeUsername}`
          );
          await sendChatMessageReminderEmail({
            role: 'helper',
            id: data.helperId,
            message: data.message,
            urlForPartner,
            notificationLanguage: emailRes.notificationLanguage,
            receiverEmailAddress: emailRes.email,
            helpeeUsername: data.helpeeUsername,
            helperUsername: data.helperUsername,
          });
          await generalModel.logEmailToDB({
            receiverRole: 'helper',
            receiverEmail: emailRes.email,
            emailType: 'chatroom_reminder',
            chatroomId: data.room,
            chatMessageContent: data.message,
            chatMessageTime: data.messageTime,
            emailSendTimestamp: Date.now(),
          });
        }
      } catch (error) {
        console.error(error.message)
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
