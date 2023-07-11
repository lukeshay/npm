const disabledByPrettier = require("./disabled-by-prettier");
const { allJsExtensions, allTestDirectories, supportedTestFileTypes, supportedTsFileTypes } = require("./utils");

module.exports = {
	extends: [
		"plugin:@typescript-eslint/all",
		"plugin:import/typescript",
		"plugin:jsdoc/recommended-typescript-error",
		"plugin:total-functions/all",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["total-functions", "etc", "tsdoc"],
	rules: {
		"@typescript-eslint/adjacent-overload-signatures": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/init-declarations": "off",
		"@typescript-eslint/member-ordering": "off",
		"@typescript-eslint/naming-convention": "off",
		"@typescript-eslint/no-restricted-imports": "off",
		"@typescript-eslint/no-type-alias": "off",
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/prefer-readonly-parameter-types": "off",
		"@typescript-eslint/strict-boolean-expressions": "off",
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{ prefer: "type-imports", fixStyle: "inline-type-imports" },
		],
		"@typescript-eslint/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: true }],
		"etc/no-const-enum": "error",
		"etc/no-enum": "error",
		"etc/no-implicit-any-catch": "error",
		"etc/no-misused-generics": "error",
		"etc/no-t": "error",
		"etc/prefer-interface": ["error", { allowIntersection: false }],
		"tsdoc/syntax": "error",
		"total-functions/no-unsafe-readonly-mutable-assignment": "off",
		...disabledByPrettier,
	},
	settings: {
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
			},
		},
		node: {
			tryExtensions: allJsExtensions.map((ext) => `.${ext}`),
		},
	},
	overrides: [
		{
			files: [...allTestDirectories, supportedTestFileTypes],
			rules: {
				"@typescript-eslint/no-shadow": [
					"error",
					{
						builtinGlobals: true,
						allow: ["defaultStatus", "event", "find", "length", "name", "status", "screen"],
					},
				],

				"@typescript-eslint/no-magic-numbers": "off",
				"@typescript-eslint/no-non-null-assertion": "off",
				"tsdoc/syntax": "error",
				...disabledByPrettier,
			},
		},
		{
			files: [supportedTsFileTypes],
			rules: {
				"jsdoc/require-param": "off",
				"jsdoc/require-returns": "off",
			},
		},
	],
};
