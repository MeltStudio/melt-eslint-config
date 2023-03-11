# @meltstudio/eslint-config

Collection of ESLint configurations used in Melt Studio.

## Base rules

All the configurations exported in this package include the following rules:

```js
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

'simple-import-sort/imports': 'error',
'simple-import-sort/exports': 'error',
```

Aditionally, for the TypeScript configurations the following rules are included:

```js
// this rule conflicts with typescript
'no-use-before-define': 'off',

// typescript
'@typescript-eslint/consistent-type-imports': 'error',
'@typescript-eslint/explicit-function-return-type': 'error',
'@typescript-eslint/explicit-module-boundary-types': 'error',
'@typescript-eslint/no-explicit-any': 'error',
'@typescript-eslint/no-use-before-define': 'error',
'@typescript-eslint/no-misused-promises': [
  'error',
  { checksVoidReturn: false },
],
```

## Usage

This package exports multiple ESLint configurations.

### node-js

Node-JavaScript configuration, it includes the following rule sets:

- `eslint:recommended`
- `airbnb-base`
- `plugin:import/recommended`
- `plugin:prettier/recommended`
- `plugin:jest/recommended` (only for test files)

and the base rules.

To use it:

1. Install it:

```bash
yarn add --dev @meltstudio/eslint-config \
    eslint-config-airbnb-base \
    eslint-config-prettier \
    eslint-plugin-prettier \
    eslint-plugin-import \
    eslint-plugin-jest \
    eslint-plugin-simple-import-sort
```

1. Add it in your eslint config:

```json
{
  ...
  "extends": ["@meltstudio/eslint-config/node-js"],
  ...
}
```

### node-ts

Node-TypeScript configuration, it includes the following rule sets:

- `eslint:recommended`
- `airbnb-base`
- `airbnb-typescript/base`
- `plugin:@typescript-eslint/eslint-recommended`
- `plugin:@typescript-eslint/recommended`
- `plugin:@typescript-eslint/recommended-requiring-type-checking`
- `plugin:import/typescript`
- `plugin:import/recommended`
- `plugin:prettier/recommended`
- `plugin:jest/recommended` (only for test files)

and the base TypeScript rules.

To use it:

1. Install it:

```bash
yarn add --dev @meltstudio/eslint-config \
    eslint-config-airbnb-base \
    eslint-config-airbnb-typescript \
    eslint-config-prettier \
    eslint-plugin-prettier \
    eslint-plugin-import \
    eslint-plugin-jest \
    eslint-plugin-simple-import-sort \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser \
    eslint-import-resolver-typescript
```

1. Add it in your eslint config:

```json
{
  ...
  "extends": ["@meltstudio/eslint-config/node-ts"],
  ...
}
```

### react-ts

React-TypeScript configuration, it includes the following rule sets:

- `airbnb`
- `airbnb/hooks`
- `airbnb-typescript`
- `plugin:@typescript-eslint/eslint-recommended`
- `plugin:@typescript-eslint/recommended`
- `plugin:@typescript-eslint/recommended-requiring-type-checking`
- `plugin:import/typescript`
- `plugin:import/recommended`
- `plugin:prettier/recommended`
- `plugin:testing-library/react` (only for test files)
- `plugin:jest/recommended` (only for test files)

all the base TypeScript rules, and the following rules:

```js
// react
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
```

To use it:

1. Install it:

```bash
yarn add --dev @meltstudio/eslint-config \
    eslint-config-airbnb \
    eslint-config-airbnb-typescript \
    eslint-config-prettier \
    eslint-plugin-prettier \
    eslint-plugin-import \
    eslint-plugin-jest \
    eslint-plugin-jest-dom \
    eslint-plugin-simple-import-sort \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser \
    eslint-import-resolver-typescript \
    eslint-plugin-jsx-a11y \
    eslint-plugin-react \
    eslint-plugin-react-hooks \
    eslint-plugin-testing-library
```

1. Add it in your eslint config:

```json
{
  ...
  "extends": ["@meltstudio/eslint-config/react-ts"],
  ...
}
```

### nextjs-ts

Next.js-TypeScript configuration. It includes the same rule sets and rules that
come with the `react-ts` configuration, plus the following rule sets:

- `plugin:@next/next/recommended`

and the following rules:

```js
'jsx-a11y/alt-text': [
  'warn',
  {
    elements: ['img'],
    img: ['Image'],
  },
],
```

To use it:

1. Install it:

```bash
yarn add --dev @meltstudio/eslint-config \
    eslint-config-airbnb \
    eslint-config-airbnb-typescript \
    eslint-config-prettier \
    eslint-plugin-prettier \
    eslint-plugin-import \
    eslint-plugin-jest \
    eslint-plugin-jest-dom \
    eslint-plugin-simple-import-sort \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser \
    eslint-import-resolver-typescript \
    eslint-plugin-jsx-a11y \
    eslint-plugin-react \
    eslint-plugin-react-hooks \
    eslint-plugin-testing-library \
    eslint-config-next
```

1. Add it in your eslint config:

```json
{
  ...
  "extends": ["@meltstudio/eslint-config/nextjs-ts"],
  ...
}
```
