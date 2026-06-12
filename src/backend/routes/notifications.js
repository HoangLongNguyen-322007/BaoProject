const express = require('express');
const router = express.Router();
const notificationRepository = require('../Repositories/notificationRepository');
const { authMiddleware } = require('../Middleware/auth');

// Get all notifications for the logged-in user (authenticated users)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await notificationRepository.findByUser(userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
  }
});

// Mark all notifications of the user as read (authenticated users)
router.put('/read-all', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    await notificationRepository.markAllAsRead(userId);
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark all as read', error: error.message });
  }
});

// Mark a specific notification as read (authenticated users)
router.put('/:id/read', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await notificationRepository.findById(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.user_id !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updated = await notificationRepository.markAsRead(id, userId);
    res.json({ message: 'Notification marked as read', notification: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark notification as read', error: error.message });
  }
});

module.exports = router;
