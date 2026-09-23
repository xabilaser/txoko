# Punto de Restauración

Fecha de creación: 2026-09-20
Versión del proyecto: 0.1.0

Este punto de restauración marca el estado estable actual del MVP. Puedes usar los scripts en `scripts/` para generar un backup portable y restaurarlo en otro equipo.

## Componentes clave en este snapshot
- Tooling: Vite 5, TypeScript 5, Tailwind 3, React 18, i18next, Zustand
- Vistas: Tablón + Arqueo (demo), Calendario, Perfil
- Lógica: Motor de Euskaltegi (rotación + satélite)
- i18n: ES/EU
- PWA: Manifest básico

## Cómo restaurar rápidamente
1) Copia el zip/tar generado por `scripts/backup.*` a tu equipo destino
2) Extrae el contenido en una carpeta de trabajo
3) Ejecuta:
   - `npm install`
   - `npm run dev`

Si deseas reconstruir producción:
- `npm run build` y servir la carpeta `dist/`
