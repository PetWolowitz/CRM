import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const pool = mysql.createPool({
  host: process.env.VITE_MYSQL_HOST,
  user: process.env.VITE_MYSQL_USER,
  password: process.env.VITE_MYSQL_PASSWORD,
  database: process.env.VITE_MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
};

export const PERMISSIONS = {
  READ_USERS: 'read_users',
  WRITE_USERS: 'write_users',
  DELETE_USERS: 'delete_users',
  MANAGE_ROLES: 'manage_roles',
  READ_DEALS: 'read_deals',
  WRITE_DEALS: 'write_deals',
  DELETE_DEALS: 'delete_deals',
  READ_CONTACTS: 'read_contacts',
  WRITE_CONTACTS: 'write_contacts',
  DELETE_CONTACTS: 'delete_contacts',
};

export async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

export async function getUserByEmail(email) {
  const users = await query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return users[0];
}

export async function createUser({ email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashedPassword]
  );
  
  // Assign default user role
  await query(
    'INSERT INTO user_roles (user_id, role_id) SELECT ?, id FROM roles WHERE name = ?',
    [result.insertId, ROLES.USER]
  );
  
  // Create user preferences
  await query(
    'INSERT INTO user_preferences (user_id) VALUES (?)',
    [result.insertId]
  );
  
  return result.insertId;
}

export async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export async function getUserRoles(userId) {
  return query(`
    SELECT r.name
    FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = ?
  `, [userId]);
}

export async function getUserPermissions(userId) {
  return query(`
    SELECT DISTINCT p.name
    FROM user_roles ur
    JOIN role_permissions rp ON ur.role_id = rp.role_id
    JOIN permissions p ON rp.permission_id = p.id
    WHERE ur.user_id = ?
  `, [userId]);
}

export async function updateUserPassword(userId, newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return query(
    'UPDATE users SET password = ? WHERE id = ?',
    [hashedPassword, userId]
  );
}