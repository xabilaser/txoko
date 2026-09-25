import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.dirname(fileURLToPath(import.meta.url))

function listFiles(dir: string, prefix = ''): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name
    return entry.isDirectory() ? listFiles(path.join(dir, entry.name), rel) : [rel]
  })
}

function precacheServiceWorker(): Plugin {
  return {
    name: 'txoko-precache-sw',
    apply: 'build',
    closeBundle() {
      const outDir = path.join(root, 'dist')
      const swPath = path.join(outDir, 'sw.js')
      if (!fs.existsSync(swPath)) return

      const files = listFiles(outDir).filter((file) => file !== 'sw.js')
      const precache = ['./', ...files.map((file) => `./${file}`)]
      const buildId = Date.now().toString(36)

      const source = fs
        .readFileSync(swPath, 'utf8')
        .replace('self.__PRECACHE__', JSON.stringify(precache))
        .replace('self.__BUILD_ID__', JSON.stringify(buildId))
      fs.writeFileSync(swPath, source)
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), precacheServiceWorker()],
  resolve: {
    alias: {
      '@components': path.resolve(root, 'src/components'),
      '@utils': path.resolve(root, 'src/utils'),
      '@models': path.resolve(root, 'src/types'),
      '@store': path.resolve(root, 'src/store'),
    }
  }
})
