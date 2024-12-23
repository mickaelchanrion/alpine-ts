import path from "node:path"
import url from "node:url"
import { defineConfig } from "vite"

const basePath = path.dirname(url.fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(basePath, "./src"),
    },
  },
})
