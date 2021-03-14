export function validatePasswords(password: string, confirmPassword: string): boolean {
  if (password !== confirmPassword) {
    return false
  }
  return true
}