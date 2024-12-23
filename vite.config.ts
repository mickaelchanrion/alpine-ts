import path from 'node:path'
import url from 'node:url'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'

const basePath = path.dirname(url.fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    // https://github.com/gxmari007/vite-plugin-eslint
    eslint({
      cache: true,
      fix: true,
      include: ['src/**/*.{js,ts}'],
      lintOnStart: true,
    }),
  resolve: {
    alias: {
      '~': path.resolve(basePath, './src'),
    },
  },
})
