export function containsAllCharacterTypes(str: string) {
  // Regex to check for at least one lowercase letter
  const hasLowercase = /[a-z]/.test(str);
  // Regex to check for at least one uppercase letter
  const hasUppercase = /[A-Z]/.test(str);
  // Regex to check for at least one digit
  const hasNumeric = /\d/.test(str);
  // Regex to check for at least one special character (non-alphanumeric)
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~` ]/.test(str);

  return hasLowercase && hasUppercase && hasNumeric && hasSpecial;
}
