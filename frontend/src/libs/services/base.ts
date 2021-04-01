type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

export async function callAPI(url: string, method: MethodType, body = null, headers = {}): Promise<any> {
  const response = await fetch(url, {
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    method: method,
    mode: 'cors',
  })
  const json = await response.json()

  if (!response.status.toString().startsWith('2')) {
    throw json
  }
  return json
}