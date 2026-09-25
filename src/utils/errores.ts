import type { TFunction } from 'i18next'

/** Los errores generados en el cliente son claves i18n; los del servidor, texto ya legible. */
export function textoError(t: TFunction, error: string): string {
  return error.startsWith('auth.') ? t(error) : error
}
