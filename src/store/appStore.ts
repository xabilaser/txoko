import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Aviso, LimpiezaExternaDia, Reserva } from '@models/index'
import localforage from 'localforage'

interface AppState {
  avisos: Aviso[]
  reservas: Reserva[]
  limpiezas: LimpiezaExternaDia[]
  setAvisos: (a: Aviso[]) => void
  setReservas: (r: Reserva[]) => void
  setLimpiezas: (l: LimpiezaExternaDia[]) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      avisos: [],
      reservas: [],
      limpiezas: [],
      setAvisos: (a) => set({ avisos: a }),
      setReservas: (r) => set({ reservas: r }),
      setLimpiezas: (l) => set({ limpiezas: l }),
    }),
    {
      name: 'txoko-store',
      version: 1,
      storage: createJSONStorage(() => localforage),
      partialize: (state) => ({
        avisos: state.avisos,
        reservas: state.reservas,
        limpiezas: state.limpiezas,
      }),
    }
  )
)
