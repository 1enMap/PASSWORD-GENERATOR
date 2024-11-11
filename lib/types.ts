export interface Password {
  id: string;
  value: string;
  timestamp: number;
  strength: number;
}

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  special: boolean;
  excludeSimilar: boolean;
  customCharacters: string;
}

export interface PasswordState {
  history: Password[];
  favorites: Password[];
  options: PasswordOptions;
}