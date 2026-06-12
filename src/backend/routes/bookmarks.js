const express = require('express');
const router = express.Router();
const bookmarkRepository = require('../Repositories/bookmarkRepository');
const articleRepository = require('../Repositories/articleRepository');
const { authMiddleware } = require('../Middleware/auth');

// Bookmark a published article (authenticated users)
router.post('/:articleId', authMiddleware, async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.user.id;

    const article = await articleRepository.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.status !== 'published') {
      return res.status(400).json({ message: 'Cannot bookmark unpublished articles' });
    }

    // Check if already bookmarked
    const existingBookmark = await bookmarkRepository.findByUserAndArticle(userId, articleId);
    if (existingBookmark) {
      return res.status(409).json({ message: 'Article already bookmarked' });
    }

    const bookmark = await bookmarkRepository.create(userId, articleId);

    res.status(201).json({
      message: 'Article bookmarked successfully',
      bookmark
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to bookmark article', error: error.message });
  }
});

// Get list of bookmarked articles for the logged-in user (authenticated users)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookmarks = await bookmarkRepository.findByUser(userId);
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookmarks', error: error.message });
  }
});

// Remove bookmark (authenticated users)
router.delete('/:articleId', authMiddleware, async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.user.id;

    const existingBookmark = await bookmarkRepository.findByUserAndArticle(userId, articleId);
    if (!existingBookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    await bookmarkRepository.delete(userId, articleId);
    res.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove bookmark', error: error.message });
  }
});

module.exports = router;
