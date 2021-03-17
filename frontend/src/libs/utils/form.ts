export function validatePasswords(password: string, confirmPassword: string): boolean {
  if (password !== confirmPassword) {
    return false
  }
  return true
}

export function fileToBase64(file: any, resolve?: (...rest: any) => void, reject?: (...rest: any) => {}) {
  const fileReader = new FileReader()
  fileReader.onload = (event: any) => resolve(event.target.result.replace(/^.*,/, ''))
  fileReader.onerror = error => reject(error)

  if (file) {
    fileReader.readAsDataURL(file)
  }
}