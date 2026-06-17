const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { initDatabase } = require('../backend/config/database');

// Import routes
const authRoutes = require('../backend/routes/auth');
const articlesPublicRoutes = require('../backend/routes/articles-public');
const articlesAuthorRoutes = require('../backend/routes/articles-author');
const articlesEditorRoutes = require('../backend/routes/articles-editor');
const adminRoutes = require('../backend/routes/admin');
const commentsRoutes = require('../backend/routes/comments');
const bookmarksRoutes = require('../backend/routes/bookmarks');
const notificationsRoutes = require('../backend/routes/notifications');
const recommendationRoutes = require('../backend/routes/recommendations');

// Create Express app
const app = express();

// Middleware
app.use(morgan('combined'));
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const { startScraperService } = require('../backend/services/scraperService');

// Initialize database (run pending migrations)
initDatabase().then(() => {
  // Bắt đầu cào dữ liệu định kỳ sau khi DB đã kết nối
  startScraperService();
}).catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articlesPublicRoutes);
app.use('/api/author/articles', articlesAuthorRoutes);
app.use('/api/editor/articles', articlesEditorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/bookmarks', bookmarksRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
