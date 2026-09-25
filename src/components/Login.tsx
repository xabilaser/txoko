import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@store/authStore'

export default function Login() {
  const { t, i18n } = useTranslation()
  const entrar = useAuthStore((s) => s.entrar)
  const error = useAuthStore((s) => s.error)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setEnviando(true)
    try {
      await entrar(email, password)
    } catch {
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-xl font-semibold">{t('auth.title')}</h1>
          <select
            aria-label={t('auth.language')}
            className="border rounded px-2 py-1 text-sm"
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            <option value="es">Castellano</option>
            <option value="eu">Euskara</option>
          </select>
        </div>

        <label className="block text-sm">
          {t('auth.email')}
          <input
            type="email"
            autoComplete="username"
            required
            className="mt-1 w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          {t('auth.password')}
          <input
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-gray-900 text-white rounded py-2 disabled:opacity-60"
        >
          {enviando ? t('auth.entering') : t('auth.enter')}
        </button>
      </form>
    </div>
  )
}
