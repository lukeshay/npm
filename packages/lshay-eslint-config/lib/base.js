const { mergeAndConcat } = require("merge-anything");
const disabledByPrettier = require("./disabled-by-prettier");
const { packageJson } = require("./utils");

/**
 * @param {import(".").Options} options - The options
 * @returns {Record<string, unknown>} The eslint config
 */
const base = (options) => {
	const sourceType = options.sourceType ?? packageJson.type ?? "commonjs";

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
					"**/.eslintrc.{js,cjs,mjs,ts}",
					"**/.eslint.config.{js,cjs,mjs,ts}",
					"**/.prettierrc.{js,cjs,mjs,ts}",
					"**/.prettier.config.{js,cjs,mjs,ts}",
					"**/vite.config.{js,cjs,mjs,ts}",
					"**/vitest.config.{js,cjs,mjs,ts}",
					"**/postcss.config.{js,cjs,mjs,ts}",
					"**/tailwind.config.{js,cjs,mjs,ts}",
				],
				parserOptions: {
					sourceType: "script",
				},
			},
		],
		parserOptions: {
			ecmaVersion: options.ecmaVersion ?? "latest",
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
			"no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
			"perfectionist/sort-union-types": "off",
			"sonarjs/no-collapsible-if": "off",
			...(options.prettier ? disabledByPrettier : {}),
		},
		settings: {
			"import/resolver": {
				node: true,
			},
		},
	};

	const sourceTypeConfig =
		sourceType === "module"
			? {}
			: {
					rules: {
						"unicorn/prefer-module": "off",
					},
			  };

	return mergeAndConcat(config, sourceTypeConfig);
};

exports.base = base;
