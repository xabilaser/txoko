import { create } from 'zustand'
import { apiFetch } from '../api/client'
import type { Usuario } from '@models/index'

interface AuthState {
  user: Usuario | null
  cargando: boolean
  error: string | null
  cargarSesion: () => Promise<void>
  entrar: (email: string, password: string) => Promise<void>
  salir: () => Promise<void>
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  cargando: true,
  error: null,
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
      set({ cargando: false, error: err instanceof Error ? err.message : 'Error de conexión' })
      throw err
    }
  },
  salir: async () => {
    try {
      await apiFetch('auth/logout.php', { method: 'POST' })
    } finally {
      set({ user: null })
    }
  },
}))
