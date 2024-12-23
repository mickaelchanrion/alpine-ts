import Alpine from 'alpinejs'

const ui = {
  init() {
    Alpine.effect(() => {
      if (this.mode === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })
  },
  mode: 'light' as 'light' | 'dark',
  setMode(mode: 'light' | 'dark') {
    this.mode = mode
  },
}

// Declare uiStore as an Alpine store module
declare module 'alpinejs' {
  interface Stores {
    ui: typeof ui
  }
}

export default ui
