const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const globals = require('globals');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ...compat.extends('eslint:recommended', 'airbnb-base'),
  ...require('./base'),
];
