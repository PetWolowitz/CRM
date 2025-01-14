import DOMPurify from 'dompurify';
import { rateLimit } from 'express-rate-limit';

// XSS Protection
export const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return DOMPurify.sanitize(input);
  }
  return input;
};

// CSRF Token Generation
export const generateCSRFToken = () => {
  return crypto.randomUUID();
};

// Rate Limiting Configuration
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Error Logging
export const logError = (error, context = {}) => {
  console.error({
    timestamp: new Date().toISOString(),
    error: {
      message: error.message,
      stack: error.stack,
      ...error
    },
    context
  });
};