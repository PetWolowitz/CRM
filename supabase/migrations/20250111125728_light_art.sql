-- Create users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create roles table
CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create permissions table
CREATE TABLE permissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create role_permissions junction table
CREATE TABLE role_permissions (
  role_id INT,
  permission_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- Create user_roles junction table
CREATE TABLE user_roles (
  user_id INT,
  role_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Create user_preferences table
CREATE TABLE user_preferences (
  user_id INT PRIMARY KEY,
  theme VARCHAR(20) DEFAULT 'light',
  language VARCHAR(10) DEFAULT 'it',
  notifications_enabled BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default roles
INSERT INTO roles (name) VALUES
  ('admin'),
  ('manager'),
  ('user');

-- Insert default permissions
INSERT INTO permissions (name, description) VALUES
  ('read_users', 'Can view user information'),
  ('write_users', 'Can create and edit users'),
  ('delete_users', 'Can delete users'),
  ('manage_roles', 'Can manage user roles'),
  ('read_deals', 'Can view deals'),
  ('write_deals', 'Can create and edit deals'),
  ('delete_deals', 'Can delete deals'),
  ('read_contacts', 'Can view contacts'),
  ('write_contacts', 'Can create and edit contacts'),
  ('delete_contacts', 'Can delete contacts');

-- Assign permissions to roles
-- Admin gets all permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM roles WHERE name = 'admin'),
  id
FROM permissions;

-- Manager gets most permissions except user management
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM roles WHERE name = 'manager'),
  id
FROM permissions 
WHERE name NOT IN ('delete_users', 'manage_roles');

-- Regular user gets basic read/write permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM roles WHERE name = 'user'),
  id
FROM permissions 
WHERE name IN ('read_deals', 'write_deals', 'read_contacts', 'write_contacts');