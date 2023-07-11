const disabledByPrettier = require("./disabled-by-prettier");
const { packageJson } = require("./utils");

module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:import/recommended",
		"plugin:unicorn/recommended",
		"plugin:promise/recommended",
		"plugin:security/recommended",
		"plugin:perfectionist/recommended-natural",
		"plugin:regexp/recommended",
		"plugin:sonar/recommended",
		"plugin:jsdoc/recommended-typescript-flavor-error",
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [
				".eslintrc.{js,cjs,mjs,ts}",
				".eslint.config.{js,cjs,mjs,ts}",
				".prettierrc.{js,cjs,mjs,ts}",
				".prettier.config.{js,cjs,mjs,ts}",
				"vite.config.{js,cjs,mjs,ts}",
				"vitest.config.{js,cjs,mjs,ts}",
				"postcss.config.{js,cjs,mjs,ts}",
				"tailwind.config.{js,cjs,mjs,ts}",
			],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: packageJson.type ?? "commonjs",
	},
	plugins: ["fp", "@regru/prefer-early-return"],
	rules: {
		"fp/no-arguments": "error",
		"fp/no-class": "error",
		"fp/no-delete": "error",
		"fp/no-events": "error",
		"fp/no-get-set": "error",
		"fp/no-let": "error",
		"fp/no-loops": "error",
		"fp/no-mutating-assign": "error",
		"fp/no-mutating-methods": "error",
		"fp/no-mutation": ["error", { commonjs: true, exceptions: [] }],
		"fp/no-proxy": "error",
		"fp/no-this": "error",
		"fp/no-valueof-field": "error",
		"fp/no-nil": "off",
		"import/no-named-as-default-member": "error",
		"sonar/no-dead-store": "off",
		"@regru/prefer-early-return/prefer-early-return": [
			"warn",
			{
				maximumStatements: 1,
			},
		],
		...disabledByPrettier,
	},
	settings: {
		"import/resolver": {
			node: true,
		},
	},
};
