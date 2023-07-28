# @lshay/eslint-config-flat

A ESLint config generator made for TypeScript projects

## Getting Started

Install using the package manager of your choice.

```
npm i -D eslint @lshay/eslint-config-flat
```

```
pnpm i -D eslint @lshay/eslint-config-flat
```

```
yarn add -D eslint @lshay/eslint-config-flat
```

Create a file named `eslint.config.js` with the following contents.

```js
import { createConfig } from "@lshay/eslint-config-flat"

export default createConfig({
	parserOptions: {
		project: "./tsconfig.json",
	},
	prettier: true,
})
```
