const express = require('express');
const router = express.Router();
const recommendationRepository = require('../Repositories/recommendationRepository');
const { authMiddleware } = require('../Middleware/auth');

// ====== TRACK READING (authenticated) ======
router.post('/track-read', authMiddleware, async (req, res) => {
  try {
    const { articleId, category } = req.body;
    if (!articleId || !category) {
      return res.status(400).json({ message: 'articleId and category are required' });
    }
    await recommendationRepository.trackReading(req.user.id, articleId, category);
    res.json({ message: 'Reading tracked' });
  } catch (error) {
    // Don't fail the user experience for tracking errors
    console.error('Track reading error:', error.message);
    res.json({ message: 'OK' });
  }
});

// ====== LIKE / UNLIKE ======
router.post('/:articleId/like', authMiddleware, async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ message: 'category is required' });
    }
    await recommendationRepository.likeArticle(req.user.id, req.params.articleId, category);
    res.json({ message: 'Article liked', liked: true });
  } catch (error) {
    res.status(500).json({ message: 'Like failed', error: error.message });
  }
});

router.delete('/:articleId/like', authMiddleware, async (req, res) => {
  try {
    const removed = await recommendationRepository.unlikeArticle(req.user.id, req.params.articleId);
    res.json({ message: removed ? 'Article unliked' : 'Not liked', liked: false });
  } catch (error) {
    res.status(500).json({ message: 'Unlike failed', error: error.message });
  }
});

// ====== CHECK LIKE STATUS ======
router.get('/:articleId/like-status', authMiddleware, async (req, res) => {
  try {
    const liked = await recommendationRepository.isLiked(req.user.id, req.params.articleId);
    res.json({ liked });
  } catch (error) {
    res.status(500).json({ message: 'Check failed', error: error.message });
  }
});

// ====== GET PERSONALIZED RECOMMENDATIONS ======
router.get('/recommendations', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 12;
    const recommendations = await recommendationRepository.getRecommendations(req.user.id, limit);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Recommendations failed', error: error.message });
  }
});

// ====== GET POPULAR (for non-logged in users) ======
router.get('/popular', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 12;
    const popular = await recommendationRepository.getPopularArticles(limit);
    res.json(popular);
  } catch (error) {
    res.status(500).json({ message: 'Popular articles failed', error: error.message });
  }
});

// ====== GET USER PREFERENCES (profile) ======
router.get('/preferences', authMiddleware, async (req, res) => {
  try {
    const preferences = await recommendationRepository.getUserPreferences(req.user.id);
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ message: 'Preferences failed', error: error.message });
  }
});

module.exports = router;
