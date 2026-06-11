const { db } = require('../config/database');
const { promisify } = require('util');

const dbRun = promisify(db.run.bind(db));
const dbGet = promisify(db.get.bind(db));
const dbAll = promisify(db.all.bind(db));

class UserRepository {
  async create(userData) {
    const { id, email, password, fullName, role, avatar, bio } = userData;
    
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (id, email, password, fullName, role, avatar, bio) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, email, password, fullName, role || 'guest', avatar || null, bio || null],
        function(err) {
          if (err) reject(err);
          else resolve({ id, email, fullName, role });
        }
      );
    });
  }

  async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  async findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT id, email, fullName, avatar, role, bio, phone, status, createdAt FROM users WHERE id = ?`,
        [id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  async findByRole(role) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT id, email, fullName, avatar, role, bio, phone, status, createdAt FROM users WHERE role = ?`,
        [role],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });
  }

  async findAll(limit = 50, offset = 0) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT id, email, fullName, avatar, role, bio, phone, status, createdAt FROM users LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });
  }

  async update(id, updateData) {
    const { fullName, avatar, bio, phone, status } = updateData;
    
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE users SET 
         fullName = COALESCE(?, fullName),
         avatar = COALESCE(?, avatar),
         bio = COALESCE(?, bio),
         phone = COALESCE(?, phone),
         status = COALESCE(?, status),
         updatedAt = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [fullName, avatar, bio, phone, status, id],
        function(err) {
          if (err) reject(err);
          else resolve({ id, ...updateData });
        }
      );
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM users WHERE id = ?`,
        [id],
        function(err) {
          if (err) reject(err);
          else resolve({ success: true });
        }
      );
    });
  }

  async updateRole(id, role) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE users SET role = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [role, id],
        function(err) {
          if (err) reject(err);
          else resolve({ id, role });
        }
      );
    });
  }
}

module.exports = new UserRepository();
