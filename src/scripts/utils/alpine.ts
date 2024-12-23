import type {
  AlpineComponent,
  DirectiveCallback,
  ElementWithXAttributes,
  MagicUtilities,
} from 'alpinejs'

/**
 * Define an Alpine component (wraps the function with Alpine's internals)
 */
export const defineComponent = <P extends unknown[], T>(
  function_: (...parameters: P) => AlpineComponent<T>,
) => function_

/**
 * Define an Alpine directive (wraps the function with Alpine's internals)
 */
export const defineDirective = (callback: DirectiveCallback) => callback

/**
 * Define an Alpine magic property (wraps the function with Alpine's internals)
 */
export const defineMagic = (
  callback: (
    element: ElementWithXAttributes,
    options: MagicUtilities,
  ) => unknown,
) => callback

/**
 * Parse a path string into its parts
 * @example '/01.$myMagic.js' => { group: undefined, order: 1, prefix: '$', name: 'myMagic', ext: 'js' }
 * @example '/group/03.x-my-directive.ts' => { group: 'group', order: 3, prefix: 'x-', name: 'my-directive', ext: 'ts' }
 */
export function parsePath(value: string): {
  group?: string
  order?: number
  prefix?: string
  name: string
  ext: string
} {
  const pathRegex =
    /(?<group>[\dA-Za-z]+)?\/((?<order>\d+).)?(?<prefix>\$|x-)?(?<name>[\dA-Za-z-]+).(?<ext>js|ts)$/

  const groups = pathRegex.exec(value)?.groups || {}
  return {
    group: groups.group || undefined,
    prefix: groups.prefix || undefined,
    order: Number.parseInt(groups.order) || undefined,
    name: groups.name,
    ext: groups.ext,
  }
}

export default { defineComponent, defineDirective, parsePath }
