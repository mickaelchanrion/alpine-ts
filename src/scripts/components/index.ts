import Alpine from 'alpinejs'
import { defineComponent, parsePath } from '~/scripts/utils/alpine'

export default function register() {
  // Auto-import components
  const components = import.meta.glob<() => ReturnType<typeof defineComponent>>(
    './**/*',
    {
      eager: true,
      import: 'default',
    },
  )

  for (const path in components) {
    const { name } = parsePath(path)
    Alpine.data(name, components[path])
  }
}
