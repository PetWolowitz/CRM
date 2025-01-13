import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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