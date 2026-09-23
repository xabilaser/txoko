import type { Consumo, CompraReserva, FaltaDespensa } from '@models/index'

export function buildWhatsAppResumen(opts: {
  fecha: string
  consumos: Consumo[]
  compras: CompraReserva[]
  faltas: FaltaDespensa[]
  comensales: number
}) {
  const totalConsumos = opts.consumos.reduce((a,c)=>a+c.subtotal,0)
  const comprasComida = opts.compras.filter(c=>c.tipo==='comida_cena').reduce((a,c)=>a+c.importe,0)
  const comprasAbast = opts.compras.filter(c=>c.tipo==='abastecimiento').reduce((a,c)=>a+c.importe,0)
  const faltasTxt = opts.faltas.map(f=>`- ${f.texto}`).join('\n') || '-'
  const lines = [
    `Txoko - Arqueo ${opts.fecha}`,
    `Comensales: ${opts.comensales}`,
    '',
    `Consumos: ${totalConsumos.toFixed(2)}€`,
    `Compras comida/cena: ${comprasComida.toFixed(2)}€`,
    `Compras abastecimiento: ${comprasAbast.toFixed(2)}€`,
    '',
    'Reposición pendiente:',
    faltasTxt
  ]
  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/?text=${text}`
}
