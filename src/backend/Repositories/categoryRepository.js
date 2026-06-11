const { db } = require('../config/database');

class CategoryRepository {
  async create(categoryData) {
    const { id, name, slug, description, color, icon } = categoryData;
    
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO categories (id, name, slug, description, color, icon)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, name, slug, description || null, color || null, icon || null],
        function(err) {
          if (err) reject(err);
          else resolve({ id, name, slug });
        }
      );
    });
  }

  async findAll() {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM categories ORDER BY name`,
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });
  }

  async findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM categories WHERE id = ?`,
        [id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  async findBySlug(slug) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM categories WHERE slug = ?`,
        [slug],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  async update(id, updateData) {
    const { name, description, color, icon } = updateData;
    
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE categories SET 
         name = COALESCE(?, name),
         description = COALESCE(?, description),
         color = COALESCE(?, color),
         icon = COALESCE(?, icon)
         WHERE id = ?`,
        [name, description, color, icon, id],
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
        `DELETE FROM categories WHERE id = ?`,
        [id],
        function(err) {
          if (err) reject(err);
          else resolve({ success: true });
        }
      );
    });
  }
}

module.exports = new CategoryRepository();
