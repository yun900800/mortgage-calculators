import eslintPluginVitest from 'eslint-plugin-vitest';

export default [
  {
    ignores: ['dist/', 'node_modules/', '*.config.js']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        FileReader: 'readonly',
        localStorage: 'readonly',
        navigator: 'readonly',
        Intl: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        requestAnimationFrame: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'off',
      'prefer-const': 'warn',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'arrow-spacing': ['warn', { before: true, after: true }],
      'comma-dangle': ['off'],
      'quotes': ['off'],
      'semi': ['off'],
      'indent': ['off'],
      'no-multi-spaces': 'off',
      'eol-last': ['off'],
      'array-bracket-spacing': ['off'],
      'object-curly-spacing': ['off'],
      'prefer-template': 'warn',
      'no-useless-escape': 'warn',
      'no-empty': 'warn'
    }
  },
  {
    files: ['**/*.test.js', '**/test/**/*.js'],
    plugins: {
      vitest: eslintPluginVitest
    },
    rules: {
      'vitest/expect-expect': 'error',
      'vitest/no-conditional-expect': 'error',
      'vitest/no-test-return-statement': 'error'
    }
  }
];