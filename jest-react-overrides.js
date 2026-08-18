const jestPlugin = require('eslint-plugin-jest');
const testingLibraryPlugin = require('eslint-plugin-testing-library');
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
      'testing-library': testingLibraryPlugin,
    },
    rules: {
      ...testingLibraryPlugin.configs['flat/react'].rules,
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
