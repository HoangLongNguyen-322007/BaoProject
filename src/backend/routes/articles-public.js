const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const articleRepository = require('../Repositories/articleRepository');
const { authMiddleware, roleMiddleware } = require('../Middleware/auth');

// Get all published articles (public)
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const articles = await articleRepository.findByStatus('published', limit, offset);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch articles', error: error.message });
  }
});

// Get article by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const article = await articleRepository.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    await articleRepository.incrementViews(req.params.id);
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch article', error: error.message });
  }
});

// Get articles by category (public)
router.get('/category/:category', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const articles = await articleRepository.findByCategory(req.params.category, limit, offset);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch articles', error: error.message });
  }
});

// Search articles (public)
router.get('/search/:query', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const articles = await articleRepository.search(req.params.query, limit, offset);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
});

module.exports = router;
