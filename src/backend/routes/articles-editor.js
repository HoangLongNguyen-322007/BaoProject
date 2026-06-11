const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const articleRepository = require('../Repositories/articleRepository');
const userRepository = require('../Repositories/userRepository');
const { authMiddleware, roleMiddleware } = require('../Middleware/auth');
const { db } = require('../config/database');

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

    // Update editor stats
    db.run(
      `UPDATE editor_stats SET articlesApproved = articlesApproved + 1, articlesReviewed = articlesReviewed + 1 
       WHERE editor_id = ?`,
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

    // Update editor stats
    db.run(
      `UPDATE editor_stats SET articlesRejected = articlesRejected + 1, articlesReviewed = articlesReviewed + 1 
       WHERE editor_id = ?`,
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
    db.run(
      `INSERT INTO comments (id, article_id, user_id, content, status)
       VALUES (?, ?, ?, ?, 'approved')`,
      [uuidv4(), req.params.id, req.user.id, suggestion],
      function(err) {
        if (err) {
          res.status(500).json({ message: 'Failed to save suggestion' });
        } else {
          res.json({ message: 'Suggestion saved' });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Failed to suggest edit', error: error.message });
  }
});

// Get editor stats
router.get('/stats/me', authMiddleware, roleMiddleware(['editor']), async (req, res) => {
  try {
    const stats = new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM editor_stats WHERE editor_id = ?`,
        [req.user.id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
    res.json(await stats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
});

module.exports = router;
