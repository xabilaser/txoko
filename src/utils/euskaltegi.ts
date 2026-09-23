import { addDays, isThursday } from './dateops'
import type { GrupoEuskaltegi, Reserva } from '@models/index'

export interface IkasturteConfig {
  inicio: string // ISO date (primer jueves de septiembre o elegido)
  fin: string // ISO date configurable
}

export interface GenerarTurnosInput {
  grupos: GrupoEuskaltegi[]
  config: IkasturteConfig
  eventosBloqueados?: string[] // ISO dates bloqueadas (partidos, admin)
}

// Genera turnos rotatorios de jueves entre los grupos
export function generarTurnosEuskaltegi({ grupos, config, eventosBloqueados = [] }: GenerarTurnosInput): Reserva[] {
  const reservas: Reserva[] = []
  const orden = [...grupos]
  if (orden.length === 0) return reservas

  // Normalizar inicio al primer jueves >= inicio
  let cursor = new Date(config.inicio)
  while (!isThursday(cursor)) cursor = addDays(cursor, 1)

  let gi = 0
  while (cursor <= new Date(config.fin)) {
    const iso = cursor.toISOString().slice(0, 10)
    if (!eventosBloqueados.includes(iso)) {
      reservas.push({
        id: `eusk-${iso}`,
        fecha: iso,
        tipo: 'euskaltegi',
        solicitanteId: orden[gi % orden.length].miembros[0] ?? 'admin',
        estado: 'confirmada',
        descripcion: `Euskaltegi ${orden[gi % orden.length].nombre}`,
        grupoId: orden[gi % orden.length].id,
      })
      gi++
    }
    // siguiente jueves
    cursor = addDays(cursor, 7)
  }
  return reservas
}

export function aplicarSatelite(pausedDateISO: string, reservas: Reserva[], colaboracion = false): Reserva[] {
  // Inserta un evento satélite en la fecha dada; si no colaboracion, desplaza el ciclo una semana
  const out: Reserva[] = []
  let desplazamiento = 0
  for (const r of reservas) {
    if (r.fecha === pausedDateISO) {
      out.push({
        id: `sat-${pausedDateISO}`,
        fecha: pausedDateISO,
        tipo: 'satelite',
        solicitanteId: r.solicitanteId,
        estado: 'confirmada',
        descripcion: 'Turno satélite',
        colaboracionSatelite: colaboracion,
        grupoId: colaboracion ? r.grupoId : undefined,
      })
      if (!colaboracion) desplazamiento = 7
      // Si no colaboración, mover el resto 1 semana
      if (!colaboracion) continue
    }
    const d = new Date(r.fecha)
    const moved = new Date(d.getTime() + desplazamiento * 24 * 60 * 60 * 1000)
    out.push({ ...r, fecha: moved.toISOString().slice(0, 10), modificado: desplazamiento !== 0 })
  }
  return out
}
