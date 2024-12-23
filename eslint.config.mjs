import globals from 'globals'

// @ts-check
import js from '@eslint/js'
import ts from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'
import unicorn from 'eslint-plugin-unicorn'

export default ts.config(
  js.configs.recommended,
  ts.configs.strict,
  prettier,
  unicorn.configs['flat/recommended'],
  {
    ignores: [
      'vendor/',
      'dist/',
      'commitlint.config.cjs',
      'postcss.config.cjs',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-new': 'off',
      'prettier/prettier': 'error',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            dist: true,
            Dist: true,
            env: true,
          },
        },
      ],
    },
  },
  {
    files: [
      'src/scripts/components/**/*.{js,ts}',
      'src/scripts/composables/**/*.{js,ts}',
      'src/scripts/store/**/*.{js,ts}',
      'src/scripts/App.{js,ts}',
    ],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
  {
    files: ['src/types/vite-env.d.ts'],
    rules: {
      'unicorn/prevent-abbreviations': 'off',
    },
  },
)
