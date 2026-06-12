const { pool } = require('../config/database');

class NotificationRepository {
  async create(notificationData) {
    const { user_id, title, message, type } = notificationData;
    const result = await pool.query(
      `INSERT INTO notifications (user_id, title, message, type, "isRead")
       VALUES ($1, $2, $3, $4, FALSE)
       RETURNING *`,
      [user_id, title, message, type || 'system']
    );
    return result.rows[0];
  }

  async findByUser(userId) {
    const result = await pool.query(
      `SELECT * FROM notifications
       WHERE user_id = $1
       ORDER BY "createdAt" DESC`,
      [userId]
    );
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      `SELECT * FROM notifications WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async markAsRead(id, userId) {
    const result = await pool.query(
      `UPDATE notifications SET "isRead" = TRUE
       WHERE id = $1 AND user_id = $2
       RETURNING id, "isRead"`,
      [id, userId]
    );
    return result.rows[0];
  }

  async markAllAsRead(userId) {
    await pool.query(
      `UPDATE notifications SET "isRead" = TRUE WHERE user_id = $1`,
      [userId]
    );
    return { success: true };
  }
}

module.exports = new NotificationRepository();
