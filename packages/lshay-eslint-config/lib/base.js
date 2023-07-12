const disabledByPrettier = require("./disabled-by-prettier");
const { packageJson } = require("./utils");

const sourceType = packageJson.type ?? "commonjs";

const config = {
	extends: [
		"eslint:recommended",
		"plugin:import/recommended",
		"plugin:unicorn/recommended",
		"plugin:promise/recommended",
		"plugin:security/recommended",
		"plugin:perfectionist/recommended-natural",
		"plugin:regexp/recommended",
		"plugin:sonarjs/recommended",
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
		sourceType,
	},
	plugins: ["fp", "@regru/prefer-early-return"],
	rules: {
		"@regru/prefer-early-return/prefer-early-return": [
			"warn",
			{
				maximumStatements: 1,
			},
		],
		"fp/no-arguments": "error",
		"fp/no-class": "off",
		"fp/no-delete": "error",
		"fp/no-events": "error",
		"fp/no-get-set": "error",
		"fp/no-let": "error",
		"fp/no-loops": "error",
		"fp/no-mutating-assign": "error",
		"fp/no-mutating-methods": "error",
		"fp/no-mutation": ["error", { commonjs: true, exceptions: [] }],
		"fp/no-nil": "off",
		"fp/no-proxy": "error",
		"fp/no-this": "off",
		"fp/no-valueof-field": "error",
		"import/no-named-as-default-member": "error",
		"sonarjs/no-collapsible-if": "off",
		...disabledByPrettier,
	},
	settings: {
		"import/resolver": {
			node: true,
		},
	},
};

if (sourceType === "commonjs") {
	// eslint-disable-next-line fp/no-mutation
	config.rules["unicorn/prefer-module"] = "off";
}

module.exports = config;
