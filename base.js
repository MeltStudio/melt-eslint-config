module.exports = {
  extends: ['plugin:import/recommended', 'plugin:prettier/recommended'],
  plugins: ['import', 'simple-import-sort', 'prettier'],
  rules: {
    // imports
    curly: 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['src/**/*', '../**/*'],
            message:
              'usage of src/* and ../**/* imports is not allowed, use paths defined in tsconfig',
          },
        ],
      },
    ],

    'import/prefer-default-export': 'off',
    'import/order': 'off',

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  overrides: [
    {
      files: ['tsup.config.ts'],
      rules: {
        'import/no-extraneous-dependencies': [
          'off',
          {
            devDependencies: ['tsup.config.ts'],
          },
        ],
      },
    },
  ],
  ignorePatterns: [
    '.eslintrc.js',
    '**/*.json',
    'node_modules',
    'public',
    'styles',
    'coverage',
    'dist',
    '.turbo',
  ],
};
