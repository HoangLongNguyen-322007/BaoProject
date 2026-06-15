const { pool } = require('../config/database');

class CommentRepository {
  async create(commentData) {
    const { article_id, user_id, content } = commentData;
    const result = await pool.query(
      `INSERT INTO comments (article_id, user_id, content, status)
       VALUES ($1, $2, $3, 'approved')
       RETURNING *`,
      [article_id, user_id, content]
    );
    return result.rows[0];
  }

  async findByArticle(articleId) {
    const result = await pool.query(
      `SELECT c.*, u."fullName" as "userName", u.avatar as "userAvatar"
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.article_id = $1 AND c.status = 'approved'
       ORDER BY c."createdAt" DESC`,
      [articleId]
    );
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      `SELECT * FROM comments WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async updateStatus(id, status) {
    const result = await pool.query(
      `UPDATE comments SET status = $1, "updatedAt" = NOW()
       WHERE id = $2 RETURNING id, status`,
      [status, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query(`DELETE FROM comments WHERE id = $1`, [id]);
    return { success: true };
  }

  async findByUser(userId) {
    const result = await pool.query(
      `SELECT c.*, a.title as "articleTitle"
       FROM comments c
       JOIN articles a ON c.article_id = a.id
       WHERE c.user_id = $1
       ORDER BY c."createdAt" DESC`,
      [userId]
    );
    return result.rows;
  }
}

module.exports = new CommentRepository();
