const { pool } = require('../config/database');

class ArticleRepository {
  async create(articleData) {
    const { title, excerpt, content, category, author_id, image, readTime } = articleData;
    const result = await pool.query(
      `INSERT INTO articles (title, excerpt, content, category, author_id, image, "readTime", status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'draft')
       RETURNING *`,
      [title, excerpt || null, content, category, author_id, image || null, readTime || 5]
    );
    return result.rows[0];
  }

  async findById(id) {
    const result = await pool.query(
      `SELECT a.*, u."fullName" as "authorName", u.avatar as "authorAvatar"
       FROM articles a
       LEFT JOIN users u ON a.author_id = u.id
       WHERE a.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findByAuthor(author_id, limit = 50, offset = 0) {
    const result = await pool.query(
      `SELECT * FROM articles WHERE author_id = $1
       ORDER BY "createdAt" DESC LIMIT $2 OFFSET $3`,
      [author_id, limit, offset]
    );
    return result.rows;
  }

  async findByStatus(status, limit = 50, offset = 0) {
    const result = await pool.query(
      `SELECT a.*, u."fullName" as "authorName"
       FROM articles a
       LEFT JOIN users u ON a.author_id = u.id
       WHERE a.status = $1
       ORDER BY a."createdAt" DESC
       LIMIT $2 OFFSET $3`,
      [status, limit, offset]
    );
    return result.rows;
  }

  async findPublished(limit = 50, offset = 0) {
    const result = await pool.query(
      `SELECT * FROM v_published_articles
       ORDER BY "publishedAt" DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return result.rows;
  }

  async findByCategory(category, limit = 50, offset = 0) {
    const result = await pool.query(
      `SELECT * FROM v_published_articles
       WHERE category = $1
       ORDER BY "publishedAt" DESC
       LIMIT $2 OFFSET $3`,
      [category, limit, offset]
    );
    return result.rows;
  }

  async findAll(limit = 50, offset = 0) {
    const result = await pool.query(
      `SELECT a.*, u."fullName" as "authorName"
       FROM articles a
       LEFT JOIN users u ON a.author_id = u.id
       ORDER BY a."createdAt" DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return result.rows;
  }

  async update(id, updateData) {
    const { title, excerpt, content, category, image, readTime } = updateData;
    const result = await pool.query(
      `UPDATE articles SET
         title = COALESCE($1, title),
         excerpt = COALESCE($2, excerpt),
         content = COALESCE($3, content),
         category = COALESCE($4, category),
         image = COALESCE($5, image),
         "readTime" = COALESCE($6, "readTime"),
         "updatedAt" = NOW()
       WHERE id = $7
       RETURNING *`,
      [title, excerpt, content, category, image, readTime, id]
    );
    return result.rows[0];
  }

  async updateStatus(id, status, rejectionReason = null) {
    let query, params;
    if (status === 'published') {
      query = `UPDATE articles SET status = $1, "publishedAt" = NOW(), "updatedAt" = NOW()
               WHERE id = $2 RETURNING id, status`;
      params = [status, id];
    } else if (status === 'rejected' && rejectionReason) {
      query = `UPDATE articles SET status = $1, "rejectionReason" = $2, "updatedAt" = NOW()
               WHERE id = $3 RETURNING id, status`;
      params = [status, rejectionReason, id];
    } else {
      query = `UPDATE articles SET status = $1, "updatedAt" = NOW()
               WHERE id = $2 RETURNING id, status`;
      params = [status, id];
    }
    const result = await pool.query(query, params);
    return result.rows[0];
  }

  async assignEditor(id, editor_id) {
    const result = await pool.query(
      `UPDATE articles SET editor_id = $1, "updatedAt" = NOW()
       WHERE id = $2 RETURNING id, editor_id`,
      [editor_id, id]
    );
    return result.rows[0];
  }

  async incrementViews(id) {
    await pool.query(
      `UPDATE articles SET views = views + 1 WHERE id = $1`,
      [id]
    );
    return { success: true };
  }

  async delete(id) {
    await pool.query(`DELETE FROM articles WHERE id = $1`, [id]);
    return { success: true };
  }

  async getSuggestions(query) {
    if (!query || !query.trim()) {
      return { articles: [], tags: [] };
    }
    const cleanQuery = query.trim();
    
    // 1. Get matching articles (limit 4)
    const articlesResult = await pool.query(
      `SELECT id, title, image, category 
       FROM v_published_articles
       WHERE title ILIKE $1 OR excerpt ILIKE $1
       ORDER BY "publishedAt" DESC
       LIMIT 4`,
      [`%${cleanQuery}%`]
    );

    // 2. Get matching tags (limit 3)
    const tagsResult = await pool.query(
      `SELECT name 
       FROM tags 
       WHERE name ILIKE $1 
       ORDER BY "articleCount" DESC 
       LIMIT 3`,
      [`%${cleanQuery}%`]
    );

    return {
      articles: articlesResult.rows,
      tags: tagsResult.rows.map(t => t.name)
    };
  }

  async search(query, limit = 50, offset = 0) {
    if (!query || !query.trim()) {
      return this.findPublished(limit, offset);
    }
    const cleanQuery = query.trim();
    const result = await pool.query(
      `SELECT *, ts_rank(search_vector, plainto_tsquery('simple', $1)) as rank
       FROM v_published_articles
       WHERE search_vector @@ plainto_tsquery('simple', $1)
          OR title ILIKE $2
          OR excerpt ILIKE $2
          OR content ILIKE $2
       ORDER BY rank DESC, "publishedAt" DESC
       LIMIT $3 OFFSET $4`,
      [cleanQuery, `%${cleanQuery}%`, limit, offset]
    );
    return result.rows;
  }

  async countByStatus() {
    const result = await pool.query(
      `SELECT status, COUNT(*) as count FROM articles GROUP BY status`
    );
    const counts = { draft: 0, pending: 0, approved: 0, rejected: 0, published: 0 };
    result.rows.forEach(row => {
      counts[row.status] = parseInt(row.count);
    });
    return counts;
  }
}

module.exports = new ArticleRepository();
