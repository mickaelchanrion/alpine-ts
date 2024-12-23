import Alpine from 'alpinejs'
import { parsePath, defineMagic } from '~/scripts/utils/alpine'

export default function register() {
  // Auto-import magics
  const magics = import.meta.glob<ReturnType<typeof defineMagic>>('./**/*', {
    eager: true,
    import: 'default',
  })

  for (const path in magics) {
    const { name } = parsePath(path)
    Alpine.magic(name, magics[path])
  }
}
