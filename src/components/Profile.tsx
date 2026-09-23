import { useTranslation } from 'react-i18next'

export default function Profile() {
  const { t } = useTranslation()
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{t('profile.title')}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="p-3 rounded border bg-white">
          <div className="font-medium mb-2">{t('profile.tasks')}</div>
          <ul className="text-sm text-gray-600 list-disc ml-4">
            <li>(demo) Trapero: 2026-09-20</li>
            <li>(demo) Abastecimiento: 2026-09-28</li>
          </ul>
        </div>
        <div className="p-3 rounded border bg-white">
          <div className="font-medium mb-2">{t('profile.balances')}</div>
          <div className="text-sm text-gray-600">(demo) -12,50€ pendiente de reembolso</div>
        </div>
      </div>
    </section>
  )
}
