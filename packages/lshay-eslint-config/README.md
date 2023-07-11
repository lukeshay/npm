# @lshay/eslint-config

The eslint config I use on my projects. Automatically adds TypeScript, React, and Vitest rules if they are install.

## Getting Started

Install using the package manager of your choice.

```
npm i -D eslint @lshay/eslint-config
```

```
pnpm i -D eslint @lshay/eslint-config
```

```
yarn add -D eslint @lshay/eslint-config
```

Create a file named `.eslintrc.cjs` with the following contents.

```js
module.exports = {
	extends: ["@lshay/eslint-config"],
	parserOptions: {
		project: ["./tsconfig.json"],
		tsconfigRootDir: __dirname,
	},
};
```
