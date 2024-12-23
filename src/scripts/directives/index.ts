import Alpine from 'alpinejs'
import { defineDirective, parsePath } from '~/scripts/utils/alpine'

export default function register() {
  // Auto-import directives
  const directives = import.meta.glob<ReturnType<typeof defineDirective>>(
    './**/*',
    {
      eager: true,
      import: 'default',
    },
  )

  for (const path in directives) {
    const { name } = parsePath(path)
    Alpine.directive(name, directives[path])
  }
}
