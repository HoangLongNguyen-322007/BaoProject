const { db } = require('./config/database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/**
 * Seed the database with initial data for testing
 */
const seedDatabase = async () => {
  // Sample users
  const users = [
    {
      id: uuidv4(),
      email: 'author1@baorong.com',
      password: await bcrypt.hash('password123', 10),
      fullName: 'Nguyễn Văn An',
      role: 'author',
      bio: 'Nhà báo chuyên viết về công nghệ',
      avatar: 'https://i.pravatar.cc/150?img=1',
      phone: '0912345678'
    },
    {
      id: uuidv4(),
      email: 'author2@baorong.com',
      password: await bcrypt.hash('password123', 10),
      fullName: 'Trần Thị Bình',
      role: 'author',
      bio: 'Nhà báo viết về đời sống xã hội',
      avatar: 'https://i.pravatar.cc/150?img=2',
      phone: '0923456789'
    },
    {
      id: uuidv4(),
      email: 'editor1@baorong.com',
      password: await bcrypt.hash('password123', 10),
      fullName: 'Phạm Văn Cường',
      role: 'editor',
      bio: 'Biên tập viên kỳ cựu',
      avatar: 'https://i.pravatar.cc/150?img=3',
      phone: '0934567890'
    },
    {
      id: uuidv4(),
      email: 'editor2@baorong.com',
      password: await bcrypt.hash('password123', 10),
      fullName: 'Lê Văn Đông',
      role: 'editor',
      bio: 'Biên tập viên kinh nghiệm',
      avatar: 'https://i.pravatar.cc/150?img=4',
      phone: '0945678901'
    },
    {
      id: uuidv4(),
      email: 'admin@baorong.com',
      password: await bcrypt.hash('password123', 10),
      fullName: 'Quản Trị Viên',
      role: 'admin',
      bio: 'Admin hệ thống',
      avatar: 'https://i.pravatar.cc/150?img=5',
      phone: '0956789012'
    }
  ];

  // Sample categories
  const categories = [
    {
      id: uuidv4(),
      name: 'Công Nghệ',
      slug: 'technology',
      description: 'Tin tức công nghệ, khoa học máy tính',
      color: '#2196F3',
      icon: '💻'
    },
    {
      id: uuidv4(),
      name: 'Đời Sống',
      slug: 'lifestyle',
      description: 'Tin tức về đời sống hàng ngày',
      color: '#FF9800',
      icon: '🏠'
    },
    {
      id: uuidv4(),
      name: 'Kinh Tế',
      slug: 'business',
      description: 'Tin tức kinh tế, tài chính',
      color: '#4CAF50',
      icon: '💼'
    },
    {
      id: uuidv4(),
      name: 'Thể Thao',
      slug: 'sports',
      description: 'Tin tức thể thao quốc tế',
      color: '#F44336',
      icon: '⚽'
    },
    {
      id: uuidv4(),
      name: 'Giáo Dục',
      slug: 'education',
      description: 'Tin tức về giáo dục',
      color: '#9C27B0',
      icon: '📚'
    }
  ];

  // Insert users
  users.forEach(user => {
    db.run(
      `INSERT OR IGNORE INTO users (id, email, password, fullName, role, bio, avatar, phone)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [user.id, user.email, user.password, user.fullName, user.role, user.bio, user.avatar, user.phone]
    );
  });

  // Insert categories
  categories.forEach(category => {
    db.run(
      `INSERT OR IGNORE INTO categories (id, name, slug, description, color, icon)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [category.id, category.name, category.slug, category.description, category.color, category.icon]
    );
  });

  // Initialize editor stats for editors
  const editors = users.filter(u => u.role === 'editor');
  editors.forEach(editor => {
    db.run(
      `INSERT OR IGNORE INTO editor_stats (id, editor_id, articlesReviewed, articlesApproved, articlesRejected, approvalRate)
       VALUES (?, ?, 0, 0, 0, 0)`,
      [uuidv4(), editor.id]
    );
  });

  console.log('✓ Database seeded with sample data');
  console.log('\nTest Accounts:');
  console.log('─────────────────────────────────────');
  console.log('Author: author1@baorong.com / password123');
  console.log('Author: author2@baorong.com / password123');
  console.log('Editor: editor1@baorong.com / password123');
  console.log('Editor: editor2@baorong.com / password123');
  console.log('Admin:  admin@baorong.com / password123');
  console.log('─────────────────────────────────────');
};

module.exports = { seedDatabase };
