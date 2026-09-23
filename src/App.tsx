import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Calendar from '@components/Calendar'
import NoticeBoard from '@components/NoticeBoard'
import Profile from '@components/Profile'
import './index.css'
import { useAppStore } from '@store/appStore'
import { generarTurnosEuskaltegi, aplicarSatelite } from '@utils/euskaltegi'
import type { GrupoEuskaltegi, Aviso } from '@models/index'

export default function App() {
  const { t, i18n } = useTranslation()
  const [tab, setTab] = useState<'board' | 'calendar' | 'profile'>('board')
  const setReservas = useAppStore((s) => s.setReservas)
  const setAvisos = useAppStore((s) => s.setAvisos)

  // Demo seed: grupos y turnos del ikasturte actual
  useEffect(() => {
    const y = new Date().getFullYear()
    // primer jueves de septiembre
    const start = new Date(y, 8 - 1, 1)
    while (start.getDay() !== 4) start.setDate(start.getDate() + 1)
    const grupos: GrupoEuskaltegi[] = [
      { id: 'g1', nombre: 'Grupo 1', miembros: ['u1','u2'] },
      { id: 'g2', nombre: 'Grupo 2', miembros: ['u3','u4'] },
      { id: 'g3', nombre: 'Grupo 3', miembros: ['u5'] },
    ]
    const base = generarTurnosEuskaltegi({
      grupos,
      config: { inicio: start.toISOString().slice(0,10), fin: new Date(y, 11, 31).toISOString().slice(0,10) },
      eventosBloqueados: [],
    })
    // ejemplo satélite en el segundo jueves
    const paused = base[1]?.fecha
    const withSat = paused ? aplicarSatelite(paused, base, false) : base
    setReservas(withSat)

    const demoAvisos: Aviso[] = [
      { id: 'a1', tipo: 'nota_general', texto: 'Bienvenidos al Txoko PWA (demo)', fecha: new Date().toISOString() },
    ]
    setAvisos(demoAvisos)
  }, [setReservas, setAvisos])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">{t('app.title')}</h1>
        <select
          className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          <option value="es">Castellano</option>
          <option value="eu">Euskara</option>
        </select>
      </header>

      <nav className="grid grid-cols-3">
        <button className={`p-3 ${tab==='board'?'bg-white':'bg-gray-100'} border-b`} onClick={() => setTab('board')}>{t('nav.board')}</button>
        <button className={`p-3 ${tab==='calendar'?'bg-white':'bg-gray-100'} border-b`} onClick={() => setTab('calendar')}>{t('nav.calendar')}</button>
        <button className={`p-3 ${tab==='profile'?'bg-white':'bg-gray-100'} border-b`} onClick={() => setTab('profile')}>{t('nav.profile')}</button>
      </nav>

      <main className="flex-1 p-4">
        {tab === 'board' && <NoticeBoard />}
        {tab === 'calendar' && <Calendar />}
        {tab === 'profile' && <Profile />}
      </main>

      <footer className="text-center text-xs text-gray-500 py-3">{t('app.footer')}</footer>
    </div>
  )
}
