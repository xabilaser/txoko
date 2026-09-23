# Txoko PWA (MVP)

Aplicación PWA mínima para gestión de Txoko (React + TypeScript + Vite + Tailwind + i18n ES/EU).

## Requisitos
- Node.js ≥ 18
- npm ≥ 9

## Instalación y desarrollo
```bash
npm install
npm run dev
```
Abre el navegador en la URL que muestre Vite (p. ej. http://localhost:5173).

## Scripts
- `npm run dev`: arranca el servidor de desarrollo Vite
- `npm run build`: compila a producción en `dist/`
- `npm run preview`: sirve la build para verificación local

## Estructura
- `src/types`: Tipos TS de dominio (socios, grupos, reservas, etc.)
- `src/utils`: Lógica de fechas de Euskaltegi, utilidades, WhatsApp
- `src/components`: UI (Tablón, Calendario, Perfil, Arqueo demo)
- `src/store`: Estado global (Zustand)
- `src/data/schema.sql`: Esquema SQLite equivalente

## i18n
- Castellano por defecto, Euskera disponible. Cambiable desde el header.

## PWA
- `public/manifest.webmanifest`. (Pendiente añadir Service Worker para offline completo.)

## Subir a GitHub
1. Crea un repositorio en GitHub (vía web) sin README inicial, o usa tu URL si ya existe.
2. En este directorio, ejecuta:
```bash
git init
git add .
git commit -m "chore: bootstrap Txoko PWA MVP"
# Sustituye por tu repositorio
# HTTPS ejemplo: https://github.com/USUARIO/txoko-pwa.git
# SSH ejemplo: git@github.com:USUARIO/txoko-pwa.git
git remote add origin <URL-DEL-REPO>
git branch -M main
git push -u origin main
```

## Despliegue en hosting (estático)
1. Construye producción:
```bash
npm run build
```
2. Sube el contenido de `dist/` a tu hosting (carpeta pública). Asegúrate de servir como SPA:
   - Si tu hosting necesita reglas para SPA (fallback a `index.html`), configúralo.

## Próximos pasos
- Persistencia (Supabase o SQLite local con sincronización)
- CRUD de reservas + panel admin (aprobaciones, bloqueos)
- Limpieza externa (calendario + avisos automáticos)
- Arqueo completo (consumos, compras, liquidaciones)
- Service Worker (offline / install prompt)
