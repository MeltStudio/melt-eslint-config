# @meltstudio/eslint-config

Collection of ESLint configurations used in Melt Studio.

## v3: flat config, ESLint 9/10+

v3 rewrites every preset as an
[ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
array (`eslint.config.js`) and bumps peer dependencies to their current majors —
ESLint 9/10 dropped support for `.eslintrc` entirely, so this isn't optional.
The underlying rules are unchanged (same airbnb ruleset, same TypeScript rules),
except for a few fixes forced by real incompatibilities between
`eslint-config-airbnb`/`eslint-plugin-react` and ESLint 10 — see **Breaking
changes** below before upgrading from v2.

If you're not ready to move to flat config yet, stay on
`@meltstudio/eslint-config@^2` and `eslint@^8`.

### Breaking changes from v2

- **Flat config only.** `.eslintrc*` is no longer supported by ESLint 9+.
  Replace `extends: ["@meltstudio/eslint-config/<preset>"]` with
  `require("@meltstudio/eslint-config/<preset>")` spread into your
  `eslint.config.js` array (see each preset below).
- **`eslint-config-next` → `@next/eslint-plugin-next`.** `nextjs-ts` now uses
  the Next.js ESLint plugin directly instead of the aggregate
  `eslint-config-next` package. Swap the devDependency.
- **`react-ts`/`nextjs-ts` set an explicit `settings.react.version`**
  (`'999.999.999'`, eslint-plugin-react's own "version unknown, assume latest"
  sentinel) instead of relying on airbnb's `'detect'`. Auto-detection calls an
  API ESLint 10 removed and crashes. "Assume latest" means version-gated rules
  never flag newer APIs as invalid, regardless of your actual React version —
  set a real `settings.react.version` in your own config if you want stricter,
  version-accurate checks instead.
- **`@typescript-eslint` peers moved 5 → 8.** Two airbnb-typescript rule
  references were removed upstream in that jump; the flat presets already
  substitute the modern equivalents (`@typescript-eslint/only-throw-error` for
  the old `no-throw-literal`, core `lines-between-class-members` for the old
  TS-specific version), so no action needed on your end.
- **No more `--ext .ts,.tsx` — scope your own rule overrides.** Flat config has
  no `--ext` equivalent, so `eslint .` scans every file by default, not just the
  ones your old `--ext` flag allowed. The `node-ts`/`react-ts`/
  `nextjs-ts`/`base-ts` presets scope themselves back to TS files internally,
  but **any rule override you add on top in your own `eslint.config.js` needs
  its own `files: ['**/*.ts', '**/*.tsx']`** (or similar) if it references a
  plugin (like `react/*`) that isn't registered for every file in your repo —
  otherwise you'll hit `could not find plugin "..."` the first time ESLint tries
  to lint a `.cjs`/`.json`/other non-TS file. Update your `lint` script to drop
  `--ext` too (`eslint --max-warnings=0 .`).

### Upstream rules patched in-place (no behavior change)

Two `eslint-plugin-import`/`eslint-plugin-react` rules unconditionally call
ESLint APIs removed in v9 (`context.parserOptions`, `context.getFilename()`) and
crash immediately under flat config, with no config-level workaround —
`react-ts.js`/`base.js` patch the plugin instance's rule implementation in place
(same messages, same options, only the removed API call is replaced) rather than
disabling them:

- `import/no-default-export` (all presets, via `base.js`)
- `react/jsx-filename-extension` (`react-ts`/`nextjs-ts`, still respects the
  `{ extensions: ['.jsx', '.tsx'] }` airbnb-typescript sets)

If a future `eslint-plugin-import`/`eslint-plugin-react` release fixes these
upstream, the patches become harmless dead code and can be deleted.

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

This package exports multiple ESLint flat configs, each an array you spread into
your own `eslint.config.js`.

### node-js

Node-JavaScript configuration, it includes the following rule sets:

- `plugin:import/recommended`
- `plugin:prettier/recommended`
- `eslint:recommended`
- `airbnb-base`

and the base rules.

To use it:

1. Install it:

```bash
yarn add --dev @meltstudio/eslint-config \
    eslint-config-airbnb-base \
    eslint-config-prettier \
    eslint-plugin-prettier \
    eslint-plugin-import \
    eslint-plugin-simple-import-sort
```

2. Add it in your `eslint.config.js`:

```js
module.exports = [...require('@meltstudio/eslint-config/node-js')];
```

### node-ts

Node-TypeScript configuration, it includes the following rule sets:

- `plugin:import/recommended`
- `plugin:prettier/recommended`
- `plugin:@typescript-eslint/eslint-recommended`
- `plugin:@typescript-eslint/recommended`
- `plugin:@typescript-eslint/recommended-type-checked`
- `plugin:import/typescript`
- `eslint:recommended`
- `airbnb-base`
- `airbnb-typescript/base`

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
    eslint-plugin-simple-import-sort \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser \
    eslint-import-resolver-typescript
```

2. Add it in your `eslint.config.js`:

```js
module.exports = [...require('@meltstudio/eslint-config/node-ts')];
```

### react-ts

React-TypeScript configuration, it includes the following rule sets:

- `plugin:import/recommended`
- `plugin:prettier/recommended`
- `plugin:@typescript-eslint/eslint-recommended`
- `plugin:@typescript-eslint/recommended`
- `plugin:@typescript-eslint/recommended-type-checked`
- `plugin:import/typescript`
- `airbnb`
- `airbnb/hooks`
- `airbnb-typescript`

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
    eslint-plugin-simple-import-sort \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser \
    eslint-import-resolver-typescript \
    eslint-plugin-jsx-a11y \
    eslint-plugin-react \
    eslint-plugin-react-hooks \
    eslint-plugin-testing-library
```

2. Add it in your `eslint.config.js`:

```js
module.exports = [...require('@meltstudio/eslint-config/react-ts')];
```

### nextjs-ts

Next.js-TypeScript configuration. It includes the same rule sets and rules that
come with the `react-ts` configuration, plus the `@next/eslint-plugin-next`
recommended rules and the following rules:

```js
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
    eslint-plugin-simple-import-sort \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser \
    eslint-import-resolver-typescript \
    eslint-plugin-jsx-a11y \
    eslint-plugin-react \
    eslint-plugin-react-hooks \
    eslint-plugin-testing-library \
    @next/eslint-plugin-next
```

2. Add it in your `eslint.config.js`:

```js
module.exports = [...require('@meltstudio/eslint-config/nextjs-ts')];
```

### jest-overrides

Base config that provides overrides for jest. It provides the following rule
set:

- `plugin:jest/recommended` (only for test files)

To use it:

1. Install it:

```bash
yarn add --dev @meltstudio/eslint-config eslint-plugin-jest
```

2. Add it in your `eslint.config.js`:

```js
module.exports = [
  // ...your other config
  ...require('@meltstudio/eslint-config/jest-overrides'),
];
```

### jest-react-overrides

Base config that provides overrides for jest when using react. It provides the
following rule sets:

- `plugin:jest/recommended` (only for test files)
- `plugin:testing-library/react` (only for test files)

To use it:

1. Install it:

```bash
yarn add --dev @meltstudio/eslint-config \
    eslint-plugin-jest \
    eslint-plugin-jest-dom \
    eslint-plugin-testing-library
```

2. Add it in your `eslint.config.js`:

```js
module.exports = [
  // ...your other config
  ...require('@meltstudio/eslint-config/jest-react-overrides'),
];
```

## Troubleshooting

### Working directory

When running ESLint you need to make sure that it's running using the workspace
root as its working directory. If you want to run ESLint using a different
working directory, you'll need to override the `parserOptions` for
[@typescript-eslint/parser](https://typescript-eslint.io/architecture/parser/),
the settings for
[eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript),
and the Next.js plugin's own resolution (see the
[Next.js ESLint docs](https://nextjs.org/docs/app/api-reference/config/eslint)).

### Monorepos and lint-staged

The
[recommended](https://github.com/okonet/lint-staged#how-to-use-lint-staged-in-a-multi-package-monorepo)
way to work with `lint-staged` in monorepos is adding separate configuration
files in each package. This ensures that `lint-staged` will run ESLint using the
package directory as its working directory.
