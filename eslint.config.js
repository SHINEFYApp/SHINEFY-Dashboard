import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Allow 'any' type
      '@typescript-eslint/no-explicit-any': 'off',

      // Allow unused vars (helpful during development)
      '@typescript-eslint/no-unused-vars': 'warn',

      // Allow empty interfaces
      '@typescript-eslint/no-empty-interface': 'off',

      // Allow require statements
      '@typescript-eslint/no-var-requires': 'off',

      // Allow non-null assertions
      '@typescript-eslint/no-non-null-assertion': 'off',

      // Allow empty functions
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
]);
