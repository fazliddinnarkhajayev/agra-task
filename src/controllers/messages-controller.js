const MessagesModel = require('../models/messages-model.js');
const BadRequestError = require('../utils/bad-request-error.js');
const { notifyUser } = require('../sockets/socket-server.js');
const { checkByUserIdIfExists } = require('../models/users-model.js');

exports.sendMessage = async (req, res, next) => {
  try {
    const { receiverId, messageText, messageType } = req.body;
    const fileName = req.file ? req.file?.filename : null;

    if (messageType == 'text' && !messageText) {
      throw new BadRequestError('messageTextIsRequired');
    } else if (messageType == 'file' && !fileName) {
      throw new BadRequestError('fileIsRequired');
    }

    const isReceiverExists = await checkByUserIdIfExists(receiverId);
    if(!isReceiverExists) {
      throw new BadRequestError('receiverUserNotFound');
    }

    const newMessage = await MessagesModel.createMessage(
      req.user.id,
      receiverId,
      messageText,
      messageType,
      fileName
    );

    // Notify receiver via WebSocket
    notifyUser(receiverId, newMessage);

    res.status(201).json({ success: true, data: { message: newMessage } });
  } catch (err) {
    next(err);
  }
};
