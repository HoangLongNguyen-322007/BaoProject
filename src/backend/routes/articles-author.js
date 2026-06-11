const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const articleRepository = require('../Repositories/articleRepository');
const userRepository = require('../Repositories/userRepository');
const { authMiddleware, roleMiddleware } = require('../Middleware/auth');

// AUTHOR ROUTES

// Create new article
router.post('/', authMiddleware, roleMiddleware(['author']), async (req, res) => {
  try {
    const { title, excerpt, content, category, image, readTime } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const articleId = uuidv4();
    const article = await articleRepository.create({
      id: articleId,
      title,
      excerpt: excerpt || content.substring(0, 200),
      content,
      category,
      author_id: req.user.id,
      image,
      readTime: readTime || 5
    });

    res.status(201).json({
      message: 'Article created successfully',
      article
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create article', error: error.message });
  }
});

// Get author's articles
router.get('/my-articles', authMiddleware, roleMiddleware(['author']), async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const articles = await articleRepository.findByAuthor(req.user.id, limit, offset);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch articles', error: error.message });
  }
});

// Get article by ID (author can see own articles)
router.get('/:id', authMiddleware, roleMiddleware(['author']), async (req, res) => {
  try {
    const article = await articleRepository.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    if (article.author_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch article', error: error.message });
  }
});

// Update article (only draft articles)
router.put('/:id', authMiddleware, roleMiddleware(['author']), async (req, res) => {
  try {
    const article = await articleRepository.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.author_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (article.status !== 'draft') {
      return res.status(400).json({ message: 'Can only edit draft articles' });
    }

    const updatedArticle = await articleRepository.update(req.params.id, req.body);
    res.json({ message: 'Article updated', article: updatedArticle });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
});

// Submit article for review
router.post('/:id/submit', authMiddleware, roleMiddleware(['author']), async (req, res) => {
  try {
    const article = await articleRepository.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.author_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (article.status !== 'draft') {
      return res.status(400).json({ message: 'Can only submit draft articles' });
    }

    await articleRepository.updateStatus(req.params.id, 'pending');
    res.json({ message: 'Article submitted for review' });
  } catch (error) {
    res.status(500).json({ message: 'Submission failed', error: error.message });
  }
});

// Delete article (only draft)
router.delete('/:id', authMiddleware, roleMiddleware(['author']), async (req, res) => {
  try {
    const article = await articleRepository.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.author_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (article.status !== 'draft') {
      return res.status(400).json({ message: 'Can only delete draft articles' });
    }

    await articleRepository.delete(req.params.id);
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Deletion failed', error: error.message });
  }
});

module.exports = router;
