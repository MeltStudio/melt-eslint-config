module.exports = {
  extends: ['./base'],
  plugins: ['import', 'simple-import-sort', 'prettier'],
  settings: {
    'import/resolver': {},
  },
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
