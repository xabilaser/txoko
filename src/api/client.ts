const base = (import.meta.env.VITE_API_BASE ?? 'api').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = new URL(`${base}/${path.replace(/^\//, '')}`, document.baseURI).href

  let response: Response
  try {
    response = await fetch(url, {
      credentials: 'include',
      headers: init.body ? { 'Content-Type': 'application/json' } : undefined,
      ...init,
    })
  } catch {
    throw new ApiError('Sin conexión con el servidor', 0)
  }

  const text = await response.text()
  let data: unknown = null
  try {
    data = text === '' ? null : JSON.parse(text)
  } catch {
    throw new ApiError('Respuesta no válida del servidor', response.status)
  }

  if (!response.ok) {
    const message =
      data !== null && typeof data === 'object' && 'error' in data
        ? String((data as { error: unknown }).error)
        : `Error ${response.status}`
    throw new ApiError(message, response.status)
  }

  return data as T
}
