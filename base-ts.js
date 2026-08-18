const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({ baseDirectory: __dirname });

const TS_FILES = ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx'];
const scopeToTsFiles = (configs) =>
  configs.map((config) =>
    config.files || config.ignores ? config : { ...config, files: TS_FILES }
  );

module.exports = scopeToTsFiles([
  ...compat.extends(
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:import/typescript'
  ),
  ...require('./base'),
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.mts', '.cts', '.tsx', '.d.ts'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      'no-use-before-define': 'off',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: false },
      ],
      'lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: false },
      ],
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/no-throw-literal': 'off',
      '@typescript-eslint/only-throw-error': 'error',
    },
  },
  {
    ignores: [
      '**/*.js',
      '**/*.json',
      'node_modules',
      'public',
      'styles',
      'coverage',
      'dist',
      '.turbo',
    ],
  },
]);
