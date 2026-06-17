const { pool } = require('../config/database');

class RecommendationRepository {
  /**
   * Ghi nhận lịch sử đọc bài viết của user
   */
  async trackReading(userId, articleId, category) {
    await pool.query(
      `INSERT INTO user_reading_history (user_id, article_id, category, read_count, last_read_at)
       VALUES ($1, $2, $3, 1, NOW())
       ON CONFLICT (user_id, article_id)
       DO UPDATE SET read_count = user_reading_history.read_count + 1, last_read_at = NOW()`,
      [userId, articleId, category]
    );
  }

  /**
   * Like bài viết
   */
  async likeArticle(userId, articleId, category) {
    await pool.query(
      `INSERT INTO user_likes (user_id, article_id, category)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, article_id) DO NOTHING`,
      [userId, articleId, category]
    );
    // Tăng likes count trên bài viết
    await pool.query(
      `UPDATE articles SET likes = COALESCE(likes, 0) + 1 WHERE id = $1`,
      [articleId]
    );
  }

  /**
   * Unlike bài viết
   */
  async unlikeArticle(userId, articleId) {
    const result = await pool.query(
      `DELETE FROM user_likes WHERE user_id = $1 AND article_id = $2 RETURNING id`,
      [userId, articleId]
    );
    if (result.rows.length > 0) {
      await pool.query(
        `UPDATE articles SET likes = GREATEST(COALESCE(likes, 0) - 1, 0) WHERE id = $1`,
        [articleId]
      );
    }
    return result.rows.length > 0;
  }

  /**
   * Kiểm tra user đã like bài viết chưa
   */
  async isLiked(userId, articleId) {
    const result = await pool.query(
      `SELECT id FROM user_likes WHERE user_id = $1 AND article_id = $2`,
      [userId, articleId]
    );
    return result.rows.length > 0;
  }

  /**
   * Lấy danh sách bài user đã like
   */
  async getUserLikes(userId) {
    const result = await pool.query(
      `SELECT article_id FROM user_likes WHERE user_id = $1`,
      [userId]
    );
    return result.rows.map(r => r.article_id);
  }

  /**
   * THUẬT TOÁN ĐỀ XUẤT THÔNG MINH
   * 
   * Tính điểm sở thích cho mỗi chuyên mục dựa trên:
   * - Lịch sử đọc (weight: 1x mỗi lần đọc)
   * - Like (weight: 3x)
   * - Bookmark (weight: 2x)
   * 
   * Sau đó chọn bài viết từ các chuyên mục có điểm cao nhất,
   * ưu tiên bài mới, loại bỏ bài đã đọc gần đây.
   */
  async getRecommendations(userId, limit = 12) {
    // 1. Tính điểm sở thích theo chuyên mục
    const categoryScores = await pool.query(`
      SELECT category, SUM(score) as total_score FROM (
        -- Điểm từ lịch sử đọc (1 điểm mỗi lần đọc)
        SELECT category, SUM(read_count) as score 
        FROM user_reading_history 
        WHERE user_id = $1 
        GROUP BY category
        
        UNION ALL
        
        -- Điểm từ Like (3 điểm mỗi like)
        SELECT category, COUNT(*) * 3 as score 
        FROM user_likes 
        WHERE user_id = $1 
        GROUP BY category
        
        UNION ALL
        
        -- Điểm từ Bookmark (2 điểm mỗi bookmark)
        SELECT a.category, COUNT(*) * 2 as score 
        FROM bookmarks b 
        JOIN articles a ON b.article_id = a.id 
        WHERE b.user_id = $1 
        GROUP BY a.category
      ) combined
      GROUP BY category
      ORDER BY total_score DESC
    `, [userId]);

    // 2. Nếu không có dữ liệu → trả bài phổ biến nhất
    if (categoryScores.rows.length === 0) {
      return this.getPopularArticles(limit);
    }

    // 3. Lấy danh sách bài đã đọc gần đây (để loại trừ)
    const recentlyRead = await pool.query(
      `SELECT article_id FROM user_reading_history 
       WHERE user_id = $1 AND last_read_at > NOW() - INTERVAL '7 days'`,
      [userId]
    );
    const readIds = recentlyRead.rows.map(r => r.article_id);

    // 4. Phân bổ số lượng bài theo điểm chuyên mục
    const totalScore = categoryScores.rows.reduce((sum, r) => sum + parseFloat(r.total_score), 0);
    const categoryAllocations = categoryScores.rows.map(r => ({
      category: r.category,
      score: parseFloat(r.total_score),
      allocation: Math.max(1, Math.round((parseFloat(r.total_score) / totalScore) * limit))
    }));

    // 5. Lấy bài viết từ mỗi chuyên mục theo tỷ lệ phân bổ
    let recommendations = [];
    for (const cat of categoryAllocations) {
      const excludeIds = [...readIds, ...recommendations.map(r => r.id)];
      const placeholders = excludeIds.length > 0 
        ? `AND id NOT IN (${excludeIds.map((_, i) => `$${i + 3}`).join(',')})` 
        : '';
      
      const query = `
        SELECT *, 'recommended' as rec_type 
        FROM v_published_articles 
        WHERE category = $1 
        ${placeholders}
        ORDER BY 
          CASE WHEN "publishedAt" > NOW() - INTERVAL '3 days' THEN 1 ELSE 0 END DESC,
          views DESC, 
          "publishedAt" DESC
        LIMIT $2
      `;
      const params = [cat.category, cat.allocation, ...excludeIds];
      
      try {
        const result = await pool.query(query, params);
        recommendations = [...recommendations, ...result.rows];
      } catch (err) {
        console.error(`Recommendation query error for category ${cat.category}:`, err.message);
      }
    }

    // 6. Thêm bài từ chuyên mục khác (diversity) nếu chưa đủ
    if (recommendations.length < limit) {
      const existingIds = recommendations.map(r => r.id);
      const allExclude = [...readIds, ...existingIds];
      const placeholders = allExclude.length > 0
        ? `AND id NOT IN (${allExclude.map((_, i) => `$${i + 2}`).join(',')})`
        : '';
      
      const remaining = limit - recommendations.length;
      const diverseQuery = `
        SELECT *, 'trending' as rec_type
        FROM v_published_articles
        WHERE 1=1 ${placeholders}
        ORDER BY views DESC, "publishedAt" DESC
        LIMIT $1
      `;
      
      try {
        const result = await pool.query(diverseQuery, [remaining, ...allExclude]);
        recommendations = [...recommendations, ...result.rows];
      } catch (err) {
        console.error('Diverse recommendation error:', err.message);
      }
    }

    return recommendations.slice(0, limit);
  }

  /**
   * Thuật toán: Tiêu điểm trong ngày (Trending Today)
   * Lấy bài viết trong 48 giờ qua, sắp xếp theo: (views * 1 + likes * 3)
   */
  async getDailyRecommendations(limit = 6) {
    const query = `
      SELECT *, 
        (views * 1 + COALESCE(likes, 0) * 3) as trending_score,
        'daily' as rec_type
      FROM v_published_articles
      WHERE "publishedAt" > NOW() - INTERVAL '48 hours'
      ORDER BY trending_score DESC, "publishedAt" DESC
      LIMIT $1
    `;
    const result = await pool.query(query, [limit]);
    
    // Nếu không đủ bài trong 48h, fallback lấy bài nhiều view nhất chưa được chọn
    if (result.rows.length < limit) {
      const remaining = limit - result.rows.length;
      const excludeIds = result.rows.map(r => r.id);
      const placeholders = excludeIds.length > 0 
        ? `AND id NOT IN (${excludeIds.map((_, i) => `$${i + 2}`).join(',')})`
        : '';
        
      const fallbackQuery = `
        SELECT *, 
          (views * 1 + COALESCE(likes, 0) * 3) as trending_score,
          'daily_fallback' as rec_type
        FROM v_published_articles
        WHERE 1=1 ${placeholders}
        ORDER BY trending_score DESC, "publishedAt" DESC
        LIMIT $1
      `;
      
      const fallbackResult = await pool.query(fallbackQuery, [remaining, ...excludeIds]);
      return [...result.rows, ...fallbackResult.rows];
    }
    
    return result.rows;
  }

  /**
   * Bài viết phổ biến nhất (fallback cho user chưa có dữ liệu)
   */
  async getPopularArticles(limit = 12) {
    const result = await pool.query(`
      SELECT *, 'popular' as rec_type
      FROM v_published_articles
      ORDER BY views DESC, likes DESC, "publishedAt" DESC
      LIMIT $1
    `, [limit]);
    return result.rows;
  }

  /**
   * Lấy thống kê sở thích của user (để hiển thị trên profile)
   */
  async getUserPreferences(userId) {
    const result = await pool.query(`
      SELECT category, SUM(score) as total_score FROM (
        SELECT category, SUM(read_count) as score 
        FROM user_reading_history WHERE user_id = $1 GROUP BY category
        UNION ALL
        SELECT category, COUNT(*) * 3 as score 
        FROM user_likes WHERE user_id = $1 GROUP BY category
        UNION ALL
        SELECT a.category, COUNT(*) * 2 as score 
        FROM bookmarks b JOIN articles a ON b.article_id = a.id 
        WHERE b.user_id = $1 GROUP BY a.category
      ) combined
      GROUP BY category
      ORDER BY total_score DESC
    `, [userId]);
    return result.rows;
  }
}

module.exports = new RecommendationRepository();
