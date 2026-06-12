const { pool } = require('../config/database');

class BookmarkRepository {
  async create(userId, articleId) {
    const result = await pool.query(
      `INSERT INTO bookmarks (user_id, article_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, article_id) DO NOTHING
       RETURNING *`,
      [userId, articleId]
    );
    return result.rows[0] || { userId, articleId };
  }

  async findByUser(userId) {
    const result = await pool.query(
      `SELECT b.id as "bookmarkId", b."createdAt" as "bookmarkedAt",
              a.*, u."fullName" as "authorName"
       FROM bookmarks b
       JOIN articles a ON b.article_id = a.id
       JOIN users u ON a.author_id = u.id
       WHERE b.user_id = $1 AND a.status = 'published'
       ORDER BY b."createdAt" DESC`,
      [userId]
    );
    return result.rows;
  }

  async findByUserAndArticle(userId, articleId) {
    const result = await pool.query(
      `SELECT * FROM bookmarks WHERE user_id = $1 AND article_id = $2`,
      [userId, articleId]
    );
    return result.rows[0] || null;
  }

  async delete(userId, articleId) {
    await pool.query(
      `DELETE FROM bookmarks WHERE user_id = $1 AND article_id = $2`,
      [userId, articleId]
    );
    return { success: true };
  }
}

module.exports = new BookmarkRepository();
