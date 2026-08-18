const { FlatCompat } = require('@eslint/eslintrc');
const path = require('node:path');
const reactPlugin = require('eslint-plugin-react');
const reactReport = require('eslint-plugin-react/lib/util/report');
const globals = require('globals');

const compat = new FlatCompat({ baseDirectory: __dirname });

{
  const original = reactPlugin.rules['jsx-filename-extension'];
  const DEFAULTS = {
    allow: 'always',
    extensions: ['.jsx'],
    ignoreFilesWithoutCode: false,
  };
  reactPlugin.rules['jsx-filename-extension'] = {
    meta: original.meta,
    create(context) {
      const filename = context.filename;
      let jsxNode;

      if (filename === '<text>') return {};

      const allow =
        (context.options[0] && context.options[0].allow) || DEFAULTS.allow;
      const allowedExtensions =
        (context.options[0] && context.options[0].extensions) ||
        DEFAULTS.extensions;
      const ignoreFilesWithoutCode =
        (context.options[0] && context.options[0].ignoreFilesWithoutCode) ||
        DEFAULTS.ignoreFilesWithoutCode;
      const isAllowedExtension = allowedExtensions.some(
        (extension) => filename.slice(-extension.length) === extension
      );

      function handleJSX(node) {
        if (!jsxNode) jsxNode = node;
      }

      return {
        JSXElement: handleJSX,
        JSXFragment: handleJSX,
        'Program:exit'(node) {
          if (jsxNode) {
            if (!isAllowedExtension) {
              reactReport(
                context,
                original.meta.messages.noJSXWithExtension,
                'noJSXWithExtension',
                { node: jsxNode, data: { ext: path.extname(filename) } }
              );
            }
            return;
          }
          if (isAllowedExtension && allow === 'as-needed') {
            if (ignoreFilesWithoutCode && node.body.length === 0) return;
            reactReport(
              context,
              original.meta.messages.extensionOnlyForJSX,
              'extensionOnlyForJSX',
              { node, data: { ext: path.extname(filename) } }
            );
          }
        },
      };
    },
  };
}

const TS_FILES = ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx'];
const scopeToTsFiles = (configs) =>
  configs.map((config) =>
    config.files || config.ignores ? config : { ...config, files: TS_FILES }
  );

module.exports = scopeToTsFiles([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  ...compat.extends('airbnb', 'airbnb/hooks', 'airbnb-typescript'),
  ...require('./base-ts'),
  {
    rules: {
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
        },
      ],
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/react-in-jsx-scope': 'off',

      'jsx-a11y/label-has-associated-control': [
        'error',
        { controlComponents: ['Field'] },
      ],
    },
    settings: {
      react: {
        // airbnb's 'detect' crashes (calls the removed context.getFilename()
        // under ESLint 10). A real version like '18.3.1' would avoid that but
        // falsely flag version-gated APIs for consumers on a different React
        // major. '999.999.999' is eslint-plugin-react's own "unknown version"
        // fallback — nothing gets flagged as invalid. Override in your own
        // config for stricter, version-accurate checks.
        version: '999.999.999',
      },
    },
  },
]);
