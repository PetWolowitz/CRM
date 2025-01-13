import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const AuthContext = createContext({});

// Password validation regex patterns
const PASSWORD_PATTERNS = {
  minLength: 8,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/
};

// Mock user data for development - in a real app, this would be in a secure database
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@example.com',
    // Password: Password@123
    password: '$2a$12$sWSdI13BJ5ipPca/f8C5iOtiKl7Z3EEPZ8gkw6PKTQQmX.ZKKYhC2',
    roles: ['admin'],
    permissions: ['read_users', 'write_users', 'delete_users', 'manage_roles'],
    failedAttempts: 0,
    lastFailedAttempt: null,
    lastLogin: null
  }
];

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds
const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
const TOKEN_REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes in milliseconds

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRoles, setUserRoles] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const navigate = useNavigate();

  // Session management
  useEffect(() => {
    const checkSession = () => {
      const storedSession = localStorage.getItem('session');
      if (storedSession) {
        const session = JSON.parse(storedSession);
        const now = Date.now();

        // Check if session has expired
        if (now - session.lastActivity > SESSION_DURATION) {
          signOut();
          return;
        }

        // Update last activity
        session.lastActivity = now;
        localStorage.setItem('session', JSON.stringify(session));

        setUser(session.user);
        setUserRoles(session.user.roles || []);
        setUserPermissions(session.user.permissions || []);
      }
      setLoading(false);
    };

    checkSession();

    // Periodically check and refresh session
    const intervalId = setInterval(checkSession, TOKEN_REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  // Security utility functions
  const isAccountLocked = (user) => {
    if (user.failedAttempts >= MAX_LOGIN_ATTEMPTS && user.lastFailedAttempt) {
      const timeSinceLastAttempt = Date.now() - user.lastFailedAttempt;
      return timeSinceLastAttempt < LOCKOUT_TIME;
    }
    return false;
  };

  const updateLoginAttempts = (userEmail, reset = false) => {
    const userIndex = MOCK_USERS.findIndex(u => u.email === userEmail);
    if (userIndex === -1) return;

    if (reset) {
      MOCK_USERS[userIndex].failedAttempts = 0;
      MOCK_USERS[userIndex].lastFailedAttempt = null;
    } else {
      MOCK_USERS[userIndex].failedAttempts += 1;
      MOCK_USERS[userIndex].lastFailedAttempt = Date.now();
    }
  };

  const validatePassword = (password) => {
    if (password.length < PASSWORD_PATTERNS.minLength) {
      throw new Error(`La password deve essere di almeno ${PASSWORD_PATTERNS.minLength} caratteri`);
    }
    if (!PASSWORD_PATTERNS.uppercase.test(password)) {
      throw new Error('La password deve contenere almeno una lettera maiuscola');
    }
    if (!PASSWORD_PATTERNS.lowercase.test(password)) {
      throw new Error('La password deve contenere almeno una lettera minuscola');
    }
    if (!PASSWORD_PATTERNS.number.test(password)) {
      throw new Error('La password deve contenere almeno un numero');
    }
    if (!PASSWORD_PATTERNS.special.test(password)) {
      throw new Error('La password deve contenere almeno un carattere speciale');
    }
  };

  const createSession = (userData) => {
    const session = {
      user: userData,
      lastActivity: Date.now(),
      expiresAt: Date.now() + SESSION_DURATION
    };
    localStorage.setItem('session', JSON.stringify(session));
  };

  // Auth functions
  const signIn = async ({ email, password }) => {
    try {
      // Find user
      const user = MOCK_USERS.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Credenziali non valide');
      }

      // Check for account lockout
      if (isAccountLocked(user)) {
        const remainingTime = Math.ceil((LOCKOUT_TIME - (Date.now() - user.lastFailedAttempt)) / 60000);
        throw new Error(`Account temporaneamente bloccato. Riprova tra ${remainingTime} minuti`);
      }

      // Verify password
      const isValid = await bcrypt.compare(password, user.password);
      
      if (!isValid) {
        updateLoginAttempts(email);
        throw new Error('Credenziali non valide');
      }

      // Reset failed attempts on successful login
      updateLoginAttempts(email, true);

      // Update last login
      user.lastLogin = Date.now();

      const userData = {
        id: user.id,
        email: user.email,
        roles: user.roles,
        permissions: user.permissions,
        lastLogin: user.lastLogin
      };

      setUser(userData);
      setUserRoles(userData.roles);
      setUserPermissions(userData.permissions);
      
      // Create session
      createSession(userData);
      
      return { data: userData, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signUp = async ({ email, password }) => {
    try {
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('Email già registrata');
      }

      // Validate password
      validatePassword(password);

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      const userData = {
        id: MOCK_USERS.length + 1,
        email,
        password: hashedPassword,
        roles: ['user'],
        permissions: ['read_deals', 'write_deals', 'read_contacts', 'write_contacts'],
        failedAttempts: 0,
        lastFailedAttempt: null,
        lastLogin: Date.now()
      };

      // In a real app, this would be saved to a database
      MOCK_USERS.push(userData);

      const sessionUser = {
        id: userData.id,
        email: userData.email,
        roles: userData.roles,
        permissions: userData.permissions,
        lastLogin: userData.lastLogin
      };

      setUser(sessionUser);
      setUserRoles(sessionUser.roles);
      setUserPermissions(sessionUser.permissions);
      
      // Create session
      createSession(sessionUser);
      
      return { data: sessionUser, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setUserRoles([]);
      setUserPermissions([]);
      localStorage.removeItem('session');
      navigate('/login');
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const updatePassword = async ({ currentPassword, newPassword }) => {
    try {
      if (!user) throw new Error('Utente non autenticato');

      const currentUser = MOCK_USERS.find(u => u.id === user.id);
      if (!currentUser) throw new Error('Utente non trovato');

      // Verify current password
      const isValid = await bcrypt.compare(currentPassword, currentUser.password);
      if (!isValid) throw new Error('Password attuale non valida');

      // Validate new password
      validatePassword(newPassword);

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      currentUser.password = hashedPassword;

      return { data: true, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const hasRole = (role) => userRoles.includes(role);
  const hasPermission = (permission) => userPermissions.includes(permission);

  const value = {
    user,
    loading,
    userRoles,
    userPermissions,
    signIn,
    signUp,
    signOut,
    updatePassword,
    hasRole,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};