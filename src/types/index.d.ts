import type Alpine from 'alpinejs'

declare global {
  /* eslint-disable no-var */
  var Alpine: Alpine | undefined
  var $store: Alpine.Stores | undefined
  /* eslint-enable no-var */
}
