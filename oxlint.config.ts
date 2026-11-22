import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['typescript', 'import', 'react'],
  categories: { correctness: 'error' },
  ignorePatterns: ['src/routeTree.gen.ts'],
  rules: {
    'import/first': 'error',
    'react/jsx-boolean-value': 'error',
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
    '@typescript-eslint/no-unused-vars': 'off',
    'react/refs': 'off',
    'react/set-state-in-effect': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'import/default': 'off',
    'no-console': ['warn', { allow: ['error'] }],
    'prefer-destructuring': ['error', { array: false, object: true }],
    'no-var': 'error',
    'no-else-return': 'error',
    eqeqeq: ['error', 'smart'],
    'prefer-template': 'error',
  },
});
