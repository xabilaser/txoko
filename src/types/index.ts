export type Rol = 'admin_propietario' | 'socio'
export type TipoCuota = 'mensual_domiciliada' | 'anual_pago_unico'
export type TipoReserva = 'euskaltegi' | 'libre' | 'partido_athletic' | 'satelite'
export type EstadoReserva = 'pendiente' | 'confirmada' | 'rechazada'

export interface Socio {
  id: string
  nombre: string
  apodo?: string
  telefono?: string
  rol: Rol
  tipoCuota: TipoCuota
  esEuskaltegi: boolean
}

export interface Usuario extends Socio {
  email: string
}

export interface GrupoEuskaltegi {
  id: string
  nombre: string // nombre o número de grupo
  miembros: string[] // ids de socios (1-4)
}

export interface ReservaBase {
  id: string
  fecha: string // ISO date
  tipo: TipoReserva
  solicitanteId: string
  estado: EstadoReserva
  descripcion?: string
}

export interface ReservaEuskaltegiExtra {
  grupoId?: string
  modificado?: boolean
  colaboracionSatelite?: boolean
}

export type Reserva = ReservaBase & Partial<ReservaEuskaltegiExtra>

export interface Comensal {
  reservaId: string
  socioId?: string
  invitadoNombre?: string
}

export interface Producto {
  id: string
  nombre: string
  categoria?: string
  precio: number
}

export interface Consumo {
  reservaId: string
  productoId: string
  cantidad: number
  subtotal: number
}

export interface CompraReserva {
  reservaId: string
  importe: number
  socioId: string // quien pago
  tipo: 'comida_cena' | 'abastecimiento'
}

export interface FaltaDespensa {
  reservaId: string
  texto: string
}

export interface Liquidacion {
  id: string
  reservaId: string
  socioId: string
  saldo: number
  estado: 'pendiente' | 'validado_admin' | 'validado_socio_acreedor'
}

export interface TurnoAuxiliar {
  id: string
  tipo: 'trapero' | 'abastecimiento' | 'limpieza_interna'
  socioId: string
  inicio: string
  fin: string
  frecuencia?: string
  estado: 'pendiente' | 'activo' | 'completado'
}

export interface LimpiezaExternaDia {
  id: string
  fecha: string
  reprogramadoDesde?: string
}

export interface Aviso {
  id: string
  tipo: 'aviso_limpieza' | 'reposición' | 'nota_general'
  texto: string
  fecha: string
  dirigidoAId?: string
}
