# Alpine.js with TypeScript

This is a simple setup to take advantage of both Alpine.js and Typescript.

## Installation

```bash
$ pnpm install
```

## CLI commands

```bash
$ pnpm dev # Start the development server

$ pnpm build # Build the theme for production

$ pnpm lint # Lint the theme files

$ pnpm lint:scripts # Lint javascript files

$ pnpm lint:prettier # Lint prettier

$ pnpm lintfix # Fix the linting issues
```

### Directives

The directives are useful to add some behavior to a HTML elements. They are located in the folder `./src/scripts/directives`.

For more information about the directives, see the [Alpine.js documentation](https://alpinejs.dev/advanced/extending#custom-directives).

#### Create a new directive

To create a new directive, you need to create a new file in the directives folder. The file name will be the name of the directive.

```ts
// ./src/scripts/directives/x-my-directive.ts
import { defineDirective } from '~/scripts/utils/alpine'

export default defineDirective(
  (
    el: ElementWithXAttributes,
    directive: DirectiveData,
    utilities: DirectiveUtilities,
  ) => {
    // Function called when the directive is initialized
  },
)
```

The directive will be automatically registered in the App (`./src/scripts/directives/index.ts`).

### Components

The components are `Alpine.data` instances. They are located in the folder `./src/scripts/components`.

For more information about the components, see the [Alpine.js documentation](https://alpinejs.dev/globals/alpine-data).

#### Create a new component

To create a new component, you need to create a new file in the components folder. The file name will be the name of the component.

```ts
// ./src/scripts/components/MyComponent.ts
import { defineComponent } from '~/scripts/utils/alpine'

export default defineComponent(() => ({
  init() {
    // Function called when the component is initialized
  },
}))
```

Then component will be automatically registered in the App (`./src/scripts/components/index.ts`).

### Store

The store is organized in modules. You can find them in the folder `./src/scripts/store`.

The store is globally accessible: `window.$store`.

For more information about the store, see the [Alpine.js documentation](https://alpinejs.dev/globals/alpine-store).

#### Create a new store module

To create a new module, you need to create a new file in the store folder. The file name will be the name of the module.

```ts
// ./src/scripts/store/myModule.ts
const myModule = {
  foo: null,
  bar() {
    // do something
  },
  get baz() {
    // get something
  },
  init() {
    // Function called when the store module is initialized
  },
}

// Declare myModule as an Alpine store module
declare module 'alpinejs' {
  interface Stores {
    myModule: typeof myModule
  }
}

export default myModule
```

The store module will be automatically registered in the App (`./src/scripts/store/index.ts`).

#### Usage inside an Alpine context (e.g.: a component)

```ts
import { defineComponent } from '~/utils/alpine'

export default defineComponent(() => ({
  init() {
    console.log(this.$store.myModule.foo) // yay! 💪
  }
})
```

#### Usage anywhere else

```ts
window.$store?.myModule.foo // yay! 💪
```

> In that case, the store is potentially `undefined` because depending on where and when you are trying to access it, the store could not be initialized yet.

### Magics

The magics are useful to add some properties or methods in the scope of Alpine (e.g.: store, component). They are located in the folder `./src/scripts/magics`.

For more information about the magics, see the [Alpine.js documentation](https://alpinejs.dev/advanced/extending#custom-magicss).

#### Create a new magic

To create a new magic, you need to create a new file in the magics folder. The file name will be the name of the magic.

```ts
// ./src/scripts/magics/$myMagic.ts
import { defineMagic } from '~/scripts/utils/alpine'

const $myMagic = (el: ElementWithXAttributes, utilities: MagicUtilities) => {
  // Your magic here
}

export default defineMagic(myMagic)

// Declare $myMagic as a magic property
declare module 'alpinejs' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface Magics<T> {
    $myMagic: ReturnType<typeof $myMagic>
  }
}
```

The magic will be automatically registered in the App (`./src/scripts/magics/index.ts`).

### TailwindCSS

#### Exposed config

It can often be useful to reference Tailwind configuration values at runtime, e.g. to access some of your theme values when dynamically applying inline styles in a component.

By default, colors and screens are exposed but you can add more values by editing the Vite config.

```ts
import colors from '#tailwindcss/colors.json'
import screens from '#tailwindcss/screens.json'
```

> Note: If you encounter the error "Cannot find module '#tailwindcss/\*.json' or its corresponding type declarations.", do not panic! You need to either start the dev server or build the theme to generate the JSON files.
