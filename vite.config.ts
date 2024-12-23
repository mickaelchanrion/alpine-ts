import path from 'node:path'
import url from 'node:url'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import writeFiles from './build/vite-plugin-write-files'
import resolveTailwindConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config'

const basePath = path.dirname(url.fileURLToPath(import.meta.url))

const resolvedTailwindConfig = resolveTailwindConfig(tailwindConfig)

export default defineConfig({
  plugins: [
    // https://github.com/gxmari007/vite-plugin-eslint
    eslint({
      cache: true,
      fix: true,
      include: ['src/**/*.{js,ts}'],
      lintOnStart: true,
    }),
    writeFiles({
      files: [
        // Write tailwind config to JSON files
        {
          output: path.resolve(basePath, 'dist/tailwindcss/colors.json'),
          data: resolvedTailwindConfig.theme.colors,
        },
        {
          output: path.resolve(basePath, 'dist/tailwindcss/screens.json'),
          data: resolvedTailwindConfig.theme.screens,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(basePath, './src'),
      '#tailwindcss': path.resolve(basePath, './dist/tailwindcss/'),
    },
  },
})
