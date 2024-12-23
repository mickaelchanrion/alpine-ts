import Alpine from 'alpinejs'
import { parsePath } from '~/scripts/utils/alpine'

export default function register() {
  // Auto-import stores
  const stores = import.meta.glob<() => unknown>('./**/*', {
    eager: true,
    import: 'default',
  })

  for (const path in stores) {
    const { name } = parsePath(path)
    Alpine.store(name, stores[path])
  }
}
