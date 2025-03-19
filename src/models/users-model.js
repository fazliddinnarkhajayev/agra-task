const pool = require('../configs/db');

class UsersModel {
  static async createUser(username, email, password_hash) {
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, password_hash]
    );
    return result.rows[0];
  }

  static async findByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  }

  static async checkByUserIdIfExists(id) {
    const result = await pool.query('SELECT 1 FROM users WHERE id = $1', [id]);
    return result.rows.length;
  }
}

module.exports = UsersModel;
