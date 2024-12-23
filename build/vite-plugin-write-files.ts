import path from 'node:path'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import type { Plugin } from 'vite'

export interface WriteFilesOptions {
  files: {
    output: string
    type?: 'json'
    data: unknown
  }[]
}

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath)
  if (existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  mkdirSync(dirname)
}

export default function writeFiles(options: WriteFilesOptions): Plugin {
  const name = 'vite-plugin-write-files'

  const writeFile = (file: WriteFilesOptions['files'][0]) => {
    const { type = 'json' } = file
    if (type === 'json') {
      ensureDirectoryExistence(file.output)
      writeFileSync(file.output, JSON.stringify(file.data, undefined, 2))
    } else {
      console.warn(`${name}: File type "${type}" is not supported.`)
    }
  }
  let config
  return {
    name,
    configResolved(resolvedConfig) {
      config = resolvedConfig
      for (const file of options.files) {
        writeFile(file)
      }
    },
    closeBundle() {
      if (config.command === 'serve') return
      for (const file of options.files) {
        writeFile(file)
      }
    },
  }
}
