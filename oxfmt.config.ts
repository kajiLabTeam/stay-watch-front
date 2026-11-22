import { defineConfig } from 'oxfmt';

export default defineConfig({
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
  sortPackageJson: false,
  ignorePatterns: ['src/routeTree.gen.ts'],
});
