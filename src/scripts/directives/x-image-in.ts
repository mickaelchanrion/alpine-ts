import { defineDirective } from '~/scripts/utils/alpine'
import { wait } from '~/scripts/utils/async'

export interface ImageInTheme {
  /** Default classes, always present */
  base?: string
  /** Classes applied when the image is loading */
  loading?: string
  /** Classes applied when the image is loaded */
  loaded?: string
}

export type ImageInThemes = Record<string, ImageInTheme>

const themes: ImageInThemes = {
  'fade-in': {
    base: 'transition',
    loading: 'opacity-0',
  },
  'scale-out': {
    base: 'transition',
    loading: 'opacity-0 scale-110',
  },
  'scale-in': {
    base: 'transition',
    loading: 'opacity-0 scale-90',
  },
  placeholder: {
    base: '!visible transition',
    loading: 'blur-2xl scale-110',
  },
}

function addClasses(img: HTMLImageElement, classes: string[] = []) {
  const tokens = classes.filter((token) => !!token)
  if (tokens.length > 0) img.classList.add(...tokens)
}
function removeClasses(img: HTMLImageElement, classes: string[] = []) {
  const tokens = classes.filter((token) => !!token)
  if (tokens.length > 0) img.classList.remove(...tokens)
}

export interface LoadCustomOptions {
  duration?: number
  base?: string
  loading?: string
  loaded?: string
  onLoad?: (img: HTMLImageElement) => void
}

export interface LoadThemeOptions {
  duration?: number
  theme: string
  onLoad?: (img: HTMLImageElement) => void
}

function load(
  img: HTMLImageElement,
  options: LoadCustomOptions | LoadThemeOptions = {},
) {
  return new Promise((resolve) => {
    const { duration = 300 } = options

    let theme: ImageInTheme = themes['fade-in']

    const isPlaceholder =
      ('theme' in options && options.theme) === 'placeholder'

    if ('theme' in options) {
      if (options.theme && themes[options.theme]) {
        theme = themes[options.theme]
      }
    } else if (
      'base' in options ||
      'loading' in options ||
      'loaded' in options
    ) {
      const { base, loading, loaded } = options
      theme = {
        base,
        loading,
        loaded,
      }
    }

    // Check if img has a class that starts with 'transition'
    if ([...img.classList].some((value) => value.startsWith('transition'))) {
      console.warn(
        "Due to the presence of a transition class, x-image-in couldn't initiate on this image in order to avoid potential conflicts.",
        img,
      )
    }

    const classList = {
      base: (theme.base || '').trim().split(' '),
      loading: (theme.loading || '').trim().split(' '),
      loaded: (theme.loaded || '').trim().split(' '),
    }

    const onLoad = async () => {
      img.removeEventListener('load', onLoad)

      resolve(img)

      if (typeof options.onLoad === 'function') {
        options.onLoad(img)
      }

      await wait(100)
      img.style.transitionDuration = `${duration}ms`
      removeClasses(img, classList.loading)
      addClasses(img, classList.loaded)

      if (isPlaceholder) {
        img.style.backgroundImage = ''
      } else {
        img.style.visibility = 'inherit'
      }

      await wait(duration)
      img.style.transitionDuration = ''
    }

    addClasses(img, classList.base)
    addClasses(img, classList.loading)

    if (img.complete) {
      onLoad()
    } else {
      img.addEventListener('load', onLoad)
    }
  })
}

/**
 * x-image-in directive
 * @example Basic usage
 * <img src="..." loading="lazy" x-image-in />
 * @example With a different theme and duration
 * <img src="..." loading="lazy" x-image-in="{ theme: 'scale-out', duration: 1000 }" />
 * @example With custom classes and duration
 * <img src="..." loading="lazy" x-image-in="{ duration: 500, default: 'always-here', loading: 'loading', loaded: 'loaded' }" />
 * @important
 * This css must be added globally:
 * img[x-image-in],
 * [x-image-in] img {
 *   visibility: hidden;
 * }
 */
export default defineDirective((element, { expression }, { evaluate }) => {
  // ⚠️ NOTE: we cannot use value and modifiers because there is CSS applied to [x-image-in]
  const options = {
    ...(expression
      ? (evaluate(expression) as LoadCustomOptions | LoadThemeOptions)
      : {}),
  }

  if (element.tagName === 'IMG') {
    load(element as HTMLImageElement, options)
  } else {
    for (const img of element.querySelectorAll('img')) load(img, options)
  }
})
