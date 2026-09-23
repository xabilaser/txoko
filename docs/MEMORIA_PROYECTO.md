# Memoria del Proyecto: Txoko PWA (MVP)

Fecha: 2026-09-20

## Objetivo
PWA rápida y sencilla para la gestión de un Txoko gastronómico familiar. Internacionalizable (ES/EU). MVP funcional con calendario, tablón y perfil, base de tipos y lógica de turnos de Euskaltegi.

## Tecnologías
- React 18 + TypeScript + Vite
- Tailwind CSS
- i18next (ES/EU)
- Zustand (estado global)
- Esquema SQLite (para demo/local) en `src/data/schema.sql`
- PWA básica (manifest)

## Estructura
- `src/components`: Calendar, NoticeBoard, Profile, ArqueoForm (demo)
- `src/store`: `appStore` (Zustand)
- `src/types`: Modelos TS (Socios, Grupos, Reservas, etc.)
- `src/utils`: Lógica de Euskaltegi, dateops, WhatsApp
- `src/data/schema.sql`: Esquema relacional base

## Modelos Principales
- Socios: id, nombre, apodo, teléfono, rol, tipoCuota, esEuskaltegi
- Grupos Euskaltegi: id, nombre, miembros (1..4 socios)
- Reservas/Eventos: id, fecha, tipo, solicitante, estado, descripción, grupoId, modificado, colaboracionSatelite
- Comensales, Productos, Consumos, Compras, Faltas de despensa, Liquidaciones
- Turnos auxiliares, Limpieza externa, Avisos (tablón)

## Lógica de negocio implementada (MVP)
- Motor de Euskaltegi: generación rotatoria de jueves entre grupos con inicio/fin de ikasturte.
- Turno Satélite: inserción que pausa el ciclo (desplaza una semana) o colaboración con el grupo del día.
- Seed de demo en `App.tsx`: genera calendario del año actual y un satélite de ejemplo.

## Vistas (MVP)
- Tablón: lista de avisos y widget de Arqueo rápido (solo WhatsApp resumen, demo)
- Calendario: mes corriente con iconos por tipo de evento
- Perfil: tarjetas demo de tareas y saldos

## i18n
- `src/i18n.ts` con recursos ES/EU. Idioma por defecto ES, selector en el header.

## PWA
- `public/manifest.webmanifest`. Pendiente incorporar Service Worker (offline/install) en siguientes iteraciones.

## Cómo ejecutar
1. Node 18+
2. Instalar dependencias: `npm install`
3. Desarrollo: `npm run dev` y abrir URL de Vite
4. Build: `npm run build` (salida en `dist/`)

## Próximos pasos
- Persistencia (Supabase o SQLite con sincronización)
- CRUD Reservas y panel Admin (aprobaciones, bloqueos)
- Gestión limpieza externa (reprogramaciones + avisos automáticos)
- Arqueo completo (consumos, compras, liquidaciones) + impresión/compartición
- PWA avanzada (service worker, cache offline, A2HS)

## Punto de Restauración
Se crea un punto de restauración en `docs/RESTORE_POINT.md` para congelar el estado actual y poder retomarlo en otros equipos.
