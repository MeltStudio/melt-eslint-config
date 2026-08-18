const jestPlugin = require('eslint-plugin-jest');
const globals = require('globals');

module.exports = [
  {
    files: [
      'jest.setup.[jt]s',
      '**/__tests__/**/*.@(js|jsx|ts|tsx)',
      '**/?(*.)+(spec|test).@(js|jsx|ts|tsx)',
      'tests/**/*.@(js|jsx|ts|tsx)',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
      'import/no-extraneous-dependencies': [
        'off',
        {
          devDependencies: [
            'jest.setup.[jt]s',
            '**/?(*.)+(spec|test).@(js|jsx|ts|tsx)',
          ],
        },
      ],
    },
  },
];
