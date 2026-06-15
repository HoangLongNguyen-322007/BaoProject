const { pool } = require('../config/database');

class UserRepository {
  async create(userData) {
    const { email, password, fullName, role, avatar, bio } = userData;
    const result = await pool.query(
      `INSERT INTO users (email, password, "fullName", role, avatar, bio)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, "fullName", role, avatar, bio, status, "createdAt"`,
      [email, password, fullName, role || 'guest', avatar || null, bio || null]
    );
    return result.rows[0];
  }

  async findByEmail(email) {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  }

  async findById(id) {
    const result = await pool.query(
      `SELECT id, email, "fullName", avatar, role, bio, phone, status, "createdAt"
       FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findByRole(role) {
    const result = await pool.query(
      `SELECT id, email, "fullName", avatar, role, bio, phone, status, "createdAt"
       FROM users WHERE role = $1 ORDER BY "createdAt" DESC`,
      [role]
    );
    return result.rows;
  }

  async findAll(limit = 50, offset = 0) {
    const result = await pool.query(
      `SELECT id, email, "fullName", avatar, role, bio, phone, status, "createdAt"
       FROM users ORDER BY "createdAt" DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return result.rows;
  }

  async update(id, updateData) {
    const { fullName, avatar, bio, phone, status } = updateData;
    const result = await pool.query(
      `UPDATE users SET
         "fullName" = COALESCE($1, "fullName"),
         avatar = COALESCE($2, avatar),
         bio = COALESCE($3, bio),
         phone = COALESCE($4, phone),
         status = COALESCE($5, status),
         "updatedAt" = NOW()
       WHERE id = $6
       RETURNING id, email, "fullName", avatar, role, bio, phone, status`,
      [fullName, avatar, bio, phone, status, id]
    );
    return result.rows[0];
  }

  async updateRole(id, role) {
    const result = await pool.query(
      `UPDATE users SET role = $1, "updatedAt" = NOW()
       WHERE id = $2 RETURNING id, role`,
      [role, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return { success: true };
  }

  async updatePassword(id, hashedPassword) {
    const result = await pool.query(
      `UPDATE users SET password = $1, "updatedAt" = NOW()
       WHERE id = $2 RETURNING id, email`,
      [hashedPassword, id]
    );
    return result.rows[0];
  }
}

module.exports = new UserRepository();
