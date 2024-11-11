import { Password, PasswordOptions } from './types';

const SIMILAR_CHARS = 'iIlL1oO0';
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export function generatePassword(options: PasswordOptions): string {
  let chars = '';
  
  if (options.uppercase) chars += UPPERCASE_CHARS;
  if (options.lowercase) chars += LOWERCASE_CHARS;
  if (options.numbers) chars += NUMBER_CHARS;
  if (options.special) chars += SPECIAL_CHARS;
  if (options.customCharacters) chars += options.customCharacters;
  
  if (options.excludeSimilar) {
    chars = chars.split('').filter(char => !SIMILAR_CHARS.includes(char)).join('');
  }
  
  if (!chars) return '';

  let password = '';
  const length = Math.min(Math.max(options.length, 6), 32);
  
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
}

export function calculateStrength(password: string): number {
  if (!password) return 0;
  
  let strength = 0;
  
  // Length contribution (up to 32 characters)
  strength += Math.min(password.length / 32 * 25, 25);
  
  // Character variety contribution
  if (/[a-z]/.test(password)) strength += 15;
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 15;
  
  // Entropy bonus for mixed character types
  const types = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter(regex => 
    regex.test(password)
  ).length;
  strength += (types - 1) * 5;
  
  return Math.min(Math.round(strength), 100);
}