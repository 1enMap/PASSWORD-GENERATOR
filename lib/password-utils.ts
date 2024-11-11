export function calculatePasswordStrength(password: string) {
  if (!password) return { score: 0, label: "None" };

  let score = 0;
  
  // Length check
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character variety checks
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // Normalize score to 0-4 range
  score = Math.min(4, Math.floor(score / 1.5));

  const labels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
  return { score, label: labels[score] };
}