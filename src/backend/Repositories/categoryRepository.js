const { pool } = require('../config/database');

class CategoryRepository {
  async create(categoryData) {
    const { name, slug, description, color, icon } = categoryData;
    const result = await pool.query(
      `INSERT INTO categories (name, slug, description, color, icon)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, slug, description || null, color || null, icon || null]
    );
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query(
      `SELECT * FROM categories ORDER BY name`
    );
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      `SELECT * FROM categories WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findBySlug(slug) {
    const result = await pool.query(
      `SELECT * FROM categories WHERE slug = $1`,
      [slug]
    );
    return result.rows[0] || null;
  }

  async update(id, updateData) {
    const { name, description, color, icon } = updateData;
    const result = await pool.query(
      `UPDATE categories SET
         name = COALESCE($1, name),
         description = COALESCE($2, description),
         color = COALESCE($3, color),
         icon = COALESCE($4, icon)
       WHERE id = $5
       RETURNING *`,
      [name, description, color, icon, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query(`DELETE FROM categories WHERE id = $1`, [id]);
    return { success: true };
  }
}

module.exports = new CategoryRepository();
