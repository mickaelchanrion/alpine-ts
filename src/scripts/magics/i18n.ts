import { defineMagic } from '~/scripts/utils/alpine'
import { useI18n } from '~/scripts/composables/useI18n'

export default defineMagic(() => useI18n())

// Declare $i18n as a magic property
declare module 'alpinejs' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface Magics<T> {
    $i18n: ReturnType<typeof useI18n>
  }
}
