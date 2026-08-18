const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const globals = require('globals');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const TS_FILES = ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx'];
const scopeToTsFiles = (configs) =>
  configs.map((config) =>
    config.files || config.ignores ? config : { ...config, files: TS_FILES }
  );

module.exports = scopeToTsFiles([
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ...compat.extends(
    'eslint:recommended',
    'airbnb-base',
    'airbnb-typescript/base'
  ),
  ...require('./base-ts'),
]);
