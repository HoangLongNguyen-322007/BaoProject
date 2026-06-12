const express = require('express');
const router = express.Router();
const articleRepository = require('../Repositories/articleRepository');
const userRepository = require('../Repositories/userRepository');
const { authMiddleware, roleMiddleware } = require('../Middleware/auth');
const { pool } = require('../config/database');
const notificationRepository = require('../Repositories/notificationRepository');

// EDITOR ROUTES

// Get pending articles for review
router.get('/pending', authMiddleware, roleMiddleware(['editor']), async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const articles = await articleRepository.findByStatus('pending', limit, offset);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending articles', error: error.message });
  }
});

// Get approved articles
router.get('/approved', authMiddleware, roleMiddleware(['editor']), async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const articles = await articleRepository.findByStatus('approved', limit, offset);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch approved articles', error: error.message });
  }
});

// Get rejected articles
router.get('/rejected', authMiddleware, roleMiddleware(['editor']), async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const articles = await articleRepository.findByStatus('rejected', limit, offset);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rejected articles', error: error.message });
  }
});

// Approve article
router.post('/:id/approve', authMiddleware, roleMiddleware(['editor']), async (req, res) => {
  try {
    const article = await articleRepository.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending articles can be approved' });
    }

    await articleRepository.updateStatus(req.params.id, 'approved');
    await articleRepository.assignEditor(req.params.id, req.user.id);

    // Create notification for author
    await notificationRepository.create({
      user_id: article.author_id,
      title: 'Bài viết được phê duyệt',
      message: `Bài viết "${article.title}" của bạn đã được phê duyệt bởi biên tập viên.`,
      type: 'approval'
    });

    // Update editor stats
    await pool.query(
      `UPDATE editor_stats SET "articlesApproved" = "articlesApproved" + 1, "articlesReviewed" = "articlesReviewed" + 1 
       WHERE editor_id = $1`,
      [req.user.id]
    );

    res.json({ message: 'Article approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Approval failed', error: error.message });
  }
});

// Reject article
router.post('/:id/reject', authMiddleware, roleMiddleware(['editor']), async (req, res) => {
  try {
    const { reason } = req.body;
    const article = await articleRepository.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending articles can be rejected' });
    }

    await articleRepository.updateStatus(req.params.id, 'rejected', reason);

    // Create notification for author
    await notificationRepository.create({
      user_id: article.author_id,
      title: 'Bài viết bị từ chối',
      message: `Bài viết "${article.title}" của bạn đã bị từ chối. Lý do: ${reason || 'Không có lý do cụ thể.'}`,
      type: 'rejection'
    });

    // Update editor stats
    await pool.query(
      `UPDATE editor_stats SET "articlesRejected" = "articlesRejected" + 1, "articlesReviewed" = "articlesReviewed" + 1 
       WHERE editor_id = $1`,
      [req.user.id]
    );

    res.json({ message: 'Article rejected', rejectionReason: reason });
  } catch (error) {
    res.status(500).json({ message: 'Rejection failed', error: error.message });
  }
});

// Suggest edits
router.post('/:id/suggest-edit', authMiddleware, roleMiddleware(['editor']), async (req, res) => {
  try {
    const { suggestion } = req.body;
    const article = await articleRepository.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Store suggestion in a log/comment system
    try {
      await pool.query(
        `INSERT INTO comments (article_id, user_id, content, status)
         VALUES ($1, $2, $3, 'approved')`,
        [req.params.id, req.user.id, suggestion]
      );
      res.json({ message: 'Suggestion saved' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to save suggestion' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to suggest edit', error: error.message });
  }
});

// Get editor stats
router.get('/stats/me', authMiddleware, roleMiddleware(['editor']), async (req, res) => {
  try {
    const stats = await pool.query(
      `SELECT * FROM editor_stats WHERE editor_id = $1`,
      [req.user.id]
    );
    res.json(stats.rows[0] || {});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
});

module.exports = router;
