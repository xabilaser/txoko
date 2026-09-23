import { useTranslation } from 'react-i18next'
import { useAppStore } from '@store/appStore'
import ArqueoForm from './ArqueoForm'

export default function NoticeBoard() {
  const { t } = useTranslation()
  const avisos = useAppStore((s) => s.avisos)

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{t('board.title')}</h2>
      {avisos.length === 0 ? (
        <p className="text-gray-500">{t('board.empty')}</p>
      ) : (
        <ul className="space-y-2">
          {avisos.map((a) => (
            <li key={a.id} className="p-3 rounded border bg-white">
              <div className="text-xs text-gray-500">{a.fecha} • {a.tipo}</div>
              <div>{a.texto}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <ArqueoForm />
      </div>
    </section>
  )
}
