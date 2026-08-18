const nextPlugin = require('@next/eslint-plugin-next');
const TS_FILES = ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx'];
const scopeToTsFiles = (configs) =>
  configs.map((config) =>
    config.files || config.ignores ? config : { ...config, files: TS_FILES }
  );

module.exports = scopeToTsFiles([
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
  ...require('./react-ts'),
  {
    rules: {
      'jsx-a11y/alt-text': [
        'error',
        {
          elements: ['img'],
          img: ['Image'],
        },
      ],
      'react/no-unknown-property': [
        'error',
        {
          ignore: ['jsx', 'global'],
        },
      ],
    },
  },
  {
    files: [
      'src/middleware.ts',
      'src/pages/**/*.{ts,tsx}',
      'src/app/**/{layout,page,loading,not-found,error}.tsx',
      'src/app/**/route.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },
]);
