import { defineComponent } from '~/scripts/utils/alpine'

export default defineComponent(() => ({
  buttonLabel(): string {
    const newMode = this.$store.ui.mode === 'light' ? 'dark' : 'light'
    return this.$i18n.t('setColorMode', { mode: newMode })
  },
  onClick() {
    this.$store.ui.setMode(this.$store.ui.mode === 'light' ? 'dark' : 'light')
  },
}))
