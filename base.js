const { FlatCompat } = require('@eslint/eslintrc');
const { getSourceCode } = require('eslint-module-utils/contextCompat');
const importPlugin = require('eslint-plugin-import');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

const compat = new FlatCompat({ baseDirectory: __dirname });

importPlugin.rules['no-default-export'] = {
  meta: importPlugin.rules['no-default-export'].meta,
  create(context) {
    if (context.languageOptions.sourceType !== 'module') return {};

    const preferNamed = 'Prefer named exports.';
    const noAliasDefault = ({ local }) =>
      `Do not alias \`${local.name}\` as \`default\`. Just export \`${local.name}\` itself instead.`;

    return {
      ExportDefaultDeclaration(node) {
        const { loc } = getSourceCode(context).getFirstTokens(node)[1] || {};
        context.report({ node, message: preferNamed, loc });
      },
      ExportNamedDeclaration(node) {
        node.specifiers
          .filter(
            (specifier) =>
              (specifier.exported.name || specifier.exported.value) ===
              'default'
          )
          .forEach((specifier) => {
            const { loc } =
              getSourceCode(context).getFirstTokens(node)[1] || {};
            if (specifier.type === 'ExportDefaultSpecifier') {
              context.report({ node, message: preferNamed, loc });
            } else if (specifier.type === 'ExportSpecifier') {
              context.report({ node, message: noAliasDefault(specifier), loc });
            }
          });
      },
    };
  },
};

module.exports = [
  ...compat.extends('plugin:import/recommended'),
  prettierRecommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
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

      'import/no-default-export': 'error',
      'import/prefer-default-export': 'off',
      'import/order': 'off',

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
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
  {
    files: [
      'jest.config.ts',
      'tsup.config.ts',
      'tailwind.config.ts',
      'drizzle.config.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    ignores: [
      '.eslintrc.js',
      '**/*.json',
      'node_modules',
      'public',
      'styles',
      'coverage',
      'dist',
      '.turbo',
    ],
  },
];
