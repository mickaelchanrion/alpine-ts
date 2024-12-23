import Alpine from 'alpinejs'
import registerStoreModules from '~/scripts/store'
import registerDirectives from '~/scripts/directives'
import registerComponents from '~/scripts/components'
import registerMagics from '~/scripts/magics'

export default function App() {
  globalThis.Alpine = Alpine

  registerMagics()
  registerStoreModules()
  registerDirectives()
  registerComponents()

  document.addEventListener('alpine:initialized', () => {
    // Make Alpine's store available globally
    const result = document.querySelector('[x-data]')

    if (result) {
      // @ts-expect-error Alpine's store will be available at this path so this is type-safe
      globalThis.$store = result._x_dataStack[0].$store
    } else {
      throw new Error(
        'No x-data found, the page should have at least one element with the x-data attribute.',
      )
    }
  })

  Alpine.start()
}
