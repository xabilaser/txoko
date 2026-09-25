const base = (import.meta.env.VITE_API_BASE ?? 'api').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = new URL(`${base}/${path.replace(/^\//, '')}`, document.baseURI).href
  const response = await fetch(url, {
    credentials: 'include',
    headers: init.body ? { 'Content-Type': 'application/json' } : undefined,
    ...init,
  })

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
