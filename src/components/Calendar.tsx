import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { useAppStore } from '@store/appStore'

function monthMatrix(date = new Date()) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const first = new Date(year, month, 1)
  const start = new Date(first)
  start.setDate(first.getDate() - ((first.getDay() + 6) % 7)) // Monday grid
  const weeks: Date[][] = []
  let cursor = start
  for (let w = 0; w < 6; w++) {
    const row: Date[] = []
    for (let d = 0; d < 7; d++) {
      row.push(new Date(cursor))
      cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 1)
    }
    weeks.push(row)
  }
  return weeks
}

export default function Calendar() {
  const { t } = useTranslation()
  const reservas = useAppStore((s) => s.reservas)

  const weeks = useMemo(() => monthMatrix(new Date()), [])

  const byDay = useMemo(() => {
    const m = new Map<string, typeof reservas>()
    for (const r of reservas) {
      const arr = m.get(r.fecha) || []
      arr.push(r)
      m.set(r.fecha, arr)
    }
    return m
  }, [reservas])

  const icon = (tipo?: string) => tipo === 'euskaltegi' ? '📚' : tipo === 'partido_athletic' ? '🏟️' : tipo === 'satelite' ? '🛰️' : '🍽️'

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{t('calendar.title')}</h2>
      <div className="grid grid-cols-7 gap-1 text-xs">
        {['L','M','X','J','V','S','D'].map((d) => (
          <div key={d} className="text-center font-medium text-gray-500 mb-1">{d}</div>
        ))}
        {weeks.flat().map((d, idx) => {
          const iso = d.toISOString().slice(0,10)
          const events = byDay.get(iso) || []
          const inMonth = d.getMonth() === new Date().getMonth()
          return (
            <div key={idx} className={`min-h-[72px] p-1 rounded border ${inMonth? 'bg-white':'bg-gray-50'} flex flex-col`}>
              <div className="text-right text-[10px] text-gray-500">{d.getDate()}</div>
              <div className="flex-1 space-y-1">
                {events.map((e) => (
                  <div key={e.id} title={e.descripcion} className="text-[11px] truncate">
                    <span>{icon(e.tipo)}</span>
                    <span className="ml-1">{e.tipo === 'euskaltegi' ? e.descripcion : e.tipo}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
