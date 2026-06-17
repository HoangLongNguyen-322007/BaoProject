const express = require('express');
const router = express.Router();
const commentRepository = require('../Repositories/commentRepository');
const articleRepository = require('../Repositories/articleRepository');
const notificationRepository = require('../Repositories/notificationRepository');
const { authMiddleware, roleMiddleware, optionalAuth } = require('../Middleware/auth');

// Retrieve all comments (editors & admins only)
router.get('/', authMiddleware, roleMiddleware(['editor', 'admin']), async (req, res) => {
  try {
    const comments = await commentRepository.findAll();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
  }
});

// Post a comment (authenticated users)
router.post('/:articleId', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const { articleId } = req.params;

    if (!content) {
      return res.status(400).json({ message: 'Comment content required' });
    }

    const article = await articleRepository.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.status !== 'published') {
      return res.status(400).json({ message: 'Cannot comment on unpublished articles' });
    }

    const comment = await commentRepository.create({
      article_id: articleId,
      user_id: req.user.id,
      content
    });

    // Notify author of the article if commenter is different
    if (article.author_id !== req.user.id) {
      await notificationRepository.create({
        user_id: article.author_id,
        title: 'Bình luận mới',
        message: `Độc giả (${req.user.email}) đã bình luận về bài viết "${article.title}": "${content.substring(0, 50)}${content.length > 50 ? '...' : ''}"`,
        type: 'comment',
        relatedId: article.id
      });
    }

    res.status(201).json({
      message: 'Comment submitted successfully',
      comment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit comment', error: error.message });
  }
});

// Retrieve my comments (authenticated users)
router.get('/my-comments', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const comments = await commentRepository.findByUser(userId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
  }
});

// Retrieve approved comments for an article (public)
router.get('/:articleId', async (req, res) => {
  try {
    const { articleId } = req.params;
    const comments = await commentRepository.findByArticle(articleId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
  }
});

// Moderate comment status: approve/reject (editors & admins only)
router.put('/:commentId/status', authMiddleware, roleMiddleware(['editor', 'admin']), async (req, res) => {
  try {
    const { status } = req.body;
    const { commentId } = req.params;

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const comment = await commentRepository.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const updatedComment = await commentRepository.updateStatus(commentId, status);
    res.json({ message: `Comment status updated to ${status}`, comment: updatedComment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
});

// Delete a comment (comment owner, or editors, or admins)
router.delete('/:commentId', authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await commentRepository.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if requester is owner, admin, or editor
    const isOwner = comment.user_id === req.user.id;
    const isStaff = ['admin', 'editor'].includes(req.user.role);

    if (!isOwner && !isStaff) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await commentRepository.delete(commentId);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment', error: error.message });
  }
});

module.exports = router;
