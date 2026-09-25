import { create } from 'zustand'
import { apiFetch, ApiError } from '../api/client'
import type { Usuario } from '@models/index'

interface AuthState {
  user: Usuario | null
  cargando: boolean
  error: string | null
  limpiarError: () => void
  cargarSesion: () => Promise<void>
  entrar: (email: string, password: string) => Promise<void>
  salir: () => Promise<void>
}

function mensaje(err: unknown): string {
  if (err instanceof ApiError && err.status === 0) {
    return 'auth.offline'
  }
  return err instanceof Error ? err.message : 'auth.offline'
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  cargando: true,
  error: null,
  limpiarError: () => set({ error: null }),
  cargarSesion: async () => {
    set({ cargando: true, error: null })
    try {
      const { user } = await apiFetch<{ user: Usuario | null }>('auth/me.php')
      set({ user, cargando: false })
    } catch {
      set({ user: null, cargando: false })
    }
  },
  entrar: async (email, password) => {
    set({ cargando: true, error: null })
    try {
      const { user } = await apiFetch<{ user: Usuario }>('auth/login.php', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      set({ user, cargando: false })
    } catch (err) {
      set({ cargando: false, error: mensaje(err) })
      throw err
    }
  },
  salir: async () => {
    try {
      await apiFetch('auth/logout.php', { method: 'POST' })
      set({ user: null, error: null })
    } catch (err) {
      set({ error: mensaje(err) })
    }
  },
}))
