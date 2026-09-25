import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  es: {
    translation: {
      app: {
        title: 'Txoko Komunitatea',
        footer: 'MVP - Gestión de Txoko',
        loading: 'Cargando…',
      },
      auth: {
        title: 'Entrar en el Txoko',
        email: 'Correo electrónico',
        password: 'Contraseña',
        enter: 'Entrar',
        entering: 'Entrando…',
        logout: 'Salir',
      },
      nav: {
        board: 'Tablón',
        calendar: 'Calendario',
        profile: 'Mi Txoko',
      },
      board: {
        title: 'Tablón de Avisos',
        empty: 'Sin avisos por ahora',
      },
      calendar: {
        title: 'Calendario',
      },
      profile: {
        title: 'Mi Txoko',
        tasks: 'Próximas tareas',
        balances: 'Saldos',
      }
    }
  },
  eu: {
    translation: {
      app: {
        title: 'Txoko Komunitatea',
        footer: 'MVP - Txoko Kudeaketa',
        loading: 'Kargatzen…',
      },
      auth: {
        title: 'Sartu Txokora',
        email: 'Helbide elektronikoa',
        password: 'Pasahitza',
        enter: 'Sartu',
        entering: 'Sartzen…',
        logout: 'Irten',
      },
      nav: {
        board: 'Iragarki taula',
        calendar: 'Egutegia',
        profile: 'Nire Txokoa',
      },
      board: {
        title: 'Iragarki Taula',
        empty: 'Ez dago iragarkirik oraingoz',
      },
      calendar: {
        title: 'Egutegia',
      },
      profile: {
        title: 'Nire Txokoa',
        tasks: 'Hurrengo zereginak',
        balances: 'Saldoak',
      }
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
  })

export default i18n
