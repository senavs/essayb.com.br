export function validatePasswords(password: string, confirmPassword: string): boolean {
  if (password !== confirmPassword) {
    return false
  }
  return true

}

export function validateImage(image: string): boolean {
  return image.length <= 500000
}

export function fileToBase64(file: any, resolve?: (...rest: any) => void, reject?: (...rest: any) => {}) {
  const fileReader = new FileReader()
  fileReader.onload = (event: any) => resolve(event.target.result.replace(/^.*,/, ''))
  fileReader.onerror = error => reject(error)

  if (file) {
    fileReader.readAsDataURL(file)
  }
}

export function formatDate(datetime: Date): string {
  const date = `${(datetime.getDay() + 1).toString().padStart(2, '0')}/${(datetime.getMonth() + 1).toString().padStart(2, '0')}/${datetime.getFullYear()}`
  const time = `${datetime.getHours().toString().padStart(2, '0')}:${datetime.getMinutes().toString().padStart(2, '0')}`
  return `${date} ${time}`
}