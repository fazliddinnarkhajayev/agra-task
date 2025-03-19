const pool = require('../configs/db');

class MessagesModel {
  static async createMessage(senderId, receiverId, messageText, messageType, fileName) {
    const result = await pool.query(
      'INSERT INTO messages (sender_id, receiver_id, message_text, message_type, message_file_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [senderId, receiverId, messageText, messageType, fileName]
    );
    return result.rows[0];
  }

}

module.exports = MessagesModel;
