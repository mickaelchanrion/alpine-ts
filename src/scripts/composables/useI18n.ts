import rosetta from 'rosetta'
import messages from '~/i18n/messages'

const defaultLocale = 'en'

export function useI18n(
  locale: string | (() => string) = () => document.documentElement.lang,
) {
  const locales = Object.keys(messages)
  const i18n = rosetta(messages)
  const currentLocale = typeof locale === 'function' ? locale() : locale
  const matchingLocale = locales.find(
    (locale) => locale === currentLocale.split('-')[0],
  )
  i18n.locale(matchingLocale || defaultLocale)
  return {
    ...i18n,
    /**
     * Get a translated message
     * @param key - The key of the message to translate
     * @param parameters - The parameters to pass to the message (e.g. variables)
     * @param lang - The language to translate the message to
     * @returns The translated message
     * @usage
     * ```ts
     * const { t } = useI18n()
     * t('intro.text', { username: 'foo' })
     * ```
     */
    t: (
      key: string | (string | number)[],
      parameters?: unknown[] | Record<string, unknown> | undefined,
      lang?: string | undefined,
    ) => {
      const value = i18n.t(key, parameters, lang)
      if (value === '') return typeof key === 'string' ? key : key.join('')
      return value
    },
  }
}
