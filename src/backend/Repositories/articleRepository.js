const { db } = require('../config/database');

class ArticleRepository {
  async create(articleData) {
    const { id, title, excerpt, content, category, author_id, image, readTime } = articleData;
    
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO articles (id, title, excerpt, content, category, author_id, image, readTime, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'draft')`,
        [id, title, excerpt, content, category, author_id, image || null, readTime || 5],
        function(err) {
          if (err) reject(err);
          else resolve({ id, title, category, status: 'draft' });
        }
      );
    });
  }

  async findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT a.*, u.fullName as authorName, u.avatar as authorAvatar 
         FROM articles a 
         LEFT JOIN users u ON a.author_id = u.id 
         WHERE a.id = ?`,
        [id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  async findByAuthor(author_id, limit = 50, offset = 0) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM articles WHERE author_id = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?`,
        [author_id, limit, offset],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });
  }

  async findByStatus(status, limit = 50, offset = 0) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT a.*, u.fullName as authorName FROM articles a 
         LEFT JOIN users u ON a.author_id = u.id 
         WHERE a.status = ? 
         ORDER BY a.createdAt DESC 
         LIMIT ? OFFSET ?`,
        [status, limit, offset],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });
  }

  async findByCategory(category, limit = 50, offset = 0) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT a.*, u.fullName as authorName FROM articles a 
         LEFT JOIN users u ON a.author_id = u.id 
         WHERE a.category = ? AND a.status = 'published'
         ORDER BY a.publishedAt DESC 
         LIMIT ? OFFSET ?`,
        [category, limit, offset],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });
  }

  async findAll(limit = 50, offset = 0) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT a.*, u.fullName as authorName FROM articles a 
         LEFT JOIN users u ON a.author_id = u.id 
         ORDER BY a.createdAt DESC 
         LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });
  }

  async update(id, updateData) {
    const { title, excerpt, content, category, image, readTime } = updateData;
    
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE articles SET 
         title = COALESCE(?, title),
         excerpt = COALESCE(?, excerpt),
         content = COALESCE(?, content),
         category = COALESCE(?, category),
         image = COALESCE(?, image),
         readTime = COALESCE(?, readTime),
         updatedAt = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [title, excerpt, content, category, image, readTime, id],
        function(err) {
          if (err) reject(err);
          else resolve({ id, ...updateData });
        }
      );
    });
  }

  async updateStatus(id, status, rejectionReason = null) {
    return new Promise((resolve, reject) => {
      let query = `UPDATE articles SET status = ?, updatedAt = CURRENT_TIMESTAMP`;
      let params = [status, id];

      if (status === 'published') {
        query += `, publishedAt = CURRENT_TIMESTAMP`;
      } else if (status === 'rejected' && rejectionReason) {
        query += `, rejectionReason = ?`;
        params = [status, rejectionReason, id];
      }

      query += ` WHERE id = ?`;

      db.run(query, params, function(err) {
        if (err) reject(err);
        else resolve({ id, status });
      });
    });
  }

  async assignEditor(id, editor_id) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE articles SET editor_id = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [editor_id, id],
        function(err) {
          if (err) reject(err);
          else resolve({ id, editor_id });
        }
      );
    });
  }

  async incrementViews(id) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE articles SET views = views + 1 WHERE id = ?`,
        [id],
        function(err) {
          if (err) reject(err);
          else resolve({ success: true });
        }
      );
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM articles WHERE id = ?`,
        [id],
        function(err) {
          if (err) reject(err);
          else resolve({ success: true });
        }
      );
    });
  }

  async search(query, limit = 50, offset = 0) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT a.*, u.fullName as authorName FROM articles a 
         LEFT JOIN users u ON a.author_id = u.id 
         WHERE (a.title LIKE ? OR a.excerpt LIKE ? OR a.content LIKE ?) 
         AND a.status = 'published'
         ORDER BY a.publishedAt DESC 
         LIMIT ? OFFSET ?`,
        [`%${query}%`, `%${query}%`, `%${query}%`, limit, offset],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });
  }
}

module.exports = new ArticleRepository();
