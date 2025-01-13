import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Genera un ID univoco usando crypto.randomUUID() del browser
export function generateId() {
  return crypto.randomUUID();
}