import { useState } from 'react'
import { buildWhatsAppResumen } from '@utils/whatsapp'

export default function ArqueoForm() {
  const [fecha] = useState(new Date().toISOString().slice(0,10))
  const [comensales, setComensales] = useState(0)
  const [faltas, setFaltas] = useState<string>('')

  const link = buildWhatsAppResumen({
    fecha,
    consumos: [],
    compras: [],
    faltas: faltas.split('\n').filter(Boolean).map(t=>({ reservaId: 'tmp', texto: t } as any)),
    comensales,
  })

  return (
    <div className="p-3 rounded border bg-white">
      <div className="font-medium mb-2">Arqueo rápido (demo)</div>
      <div className="grid gap-2">
        <label className="text-sm">Comensales
          <input type="number" className="ml-2 border rounded px-2 py-1" value={comensales} onChange={e=>setComensales(parseInt(e.target.value||'0'))} />
        </label>
        <label className="text-sm">Faltas de despensa
          <textarea className="block w-full border rounded px-2 py-1 mt-1" rows={3} placeholder="Azúcar, café, sal..." value={faltas} onChange={e=>setFaltas(e.target.value)} />
        </label>
        <a className="inline-block bg-green-600 text-white px-3 py-2 rounded text-sm w-max" href={link} target="_blank">Exportar a WhatsApp</a>
      </div>
    </div>
  )
}
