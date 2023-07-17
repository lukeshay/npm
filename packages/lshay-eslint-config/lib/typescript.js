const disabledByPrettier = require("./disabled-by-prettier");
const {
	allExtensions,
	allTestDirectories,
	getSourceType,
	log,
	supportedFileTypes,
	supportedJsFileTypes,
	supportedTestFileTypes,
	supportedTsFileTypes,
} = require("./utils");

const DISABLED_CJS_RULES = {
	"@typescript-eslint/no-require-imports": "off",
	"@typescript-eslint/no-unsafe-assignment": "off",
	"@typescript-eslint/no-var-requires": "off",
};

const DISABLED_JS_RULES = {
	"@typescript-eslint/no-unsafe-assignment": "off",
	"@typescript-eslint/no-unsafe-call": "off",
	"@typescript-eslint/no-unsafe-member-access": "off",
	"@typescript-eslint/no-unsafe-return": "off",
};

/**
 * @param {import(".").Options} options - The options
 * @returns {Record<string, unknown>} The eslint config
 */
const typescript = (options) => {
	if (!options.typescript) {
		log("Skipping typescript config");

		return {};
	}

	const sourceType = getSourceType(options);

	return {
		overrides: [
			{
				extends: [
					"plugin:@typescript-eslint/all",
					"plugin:import/typescript",
					"plugin:jsdoc/recommended-typescript-error",
					"plugin:total-functions/all",
				],
				files: options.typescript.files ?? [supportedFileTypes],
				overrides: [
					{
						files: [...allTestDirectories, supportedTestFileTypes],
						rules: {
							"@typescript-eslint/no-magic-numbers": "off",
							"@typescript-eslint/no-non-null-assertion": "off",
							"@typescript-eslint/no-shadow": [
								"error",
								{
									allow: ["defaultStatus", "event", "find", "length", "name", "status", "screen"],
									builtinGlobals: true,
								},
							],
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
					{
						files: [supportedJsFileTypes],
						rules: DISABLED_JS_RULES,
					},
					{
						files: [`*c{js,ts}`],
						rules: DISABLED_CJS_RULES,
					},
				],
				parser: "@typescript-eslint/parser",
				plugins: ["total-functions", "etc", "tsdoc"],
				rules: {
					"@typescript-eslint/adjacent-overload-signatures": "off",
					"@typescript-eslint/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: true }],
					"@typescript-eslint/consistent-type-imports": [
						"error",
						{ fixStyle: "inline-type-imports", prefer: "type-imports" },
					],
					"@typescript-eslint/explicit-function-return-type": "off",
					"@typescript-eslint/explicit-module-boundary-types": "off",
					"@typescript-eslint/init-declarations": "off",
					"@typescript-eslint/member-ordering": "off",
					"@typescript-eslint/naming-convention": "off",
					"@typescript-eslint/no-restricted-imports": "off",
					"@typescript-eslint/no-type-alias": "off",
					"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
					"@typescript-eslint/prefer-readonly-parameter-types": "off",
					"@typescript-eslint/strict-boolean-expressions": "off",
					"etc/no-const-enum": "error",
					"etc/no-enum": "error",
					"etc/no-implicit-any-catch": "error",
					"etc/no-misused-generics": "error",
					"etc/no-t": "error",
					"etc/prefer-interface": ["error", { allowIntersection: false }],
					"no-unused-vars": "off",
					"total-functions/no-unsafe-readonly-mutable-assignment": "off",
					"tsdoc/syntax": "error",
					...(options.prettier ? disabledByPrettier : {}),
					...(sourceType === "commonjs" ? DISABLED_CJS_RULES : {}),
				},
				settings: {
					"import/resolver": {
						typescript: {
							alwaysTryTypes: true,
						},
					},
					node: {
						tryExtensions: allExtensions.map((extension) => `.${extension}`),
					},
				},
			},
		],
	};
};

exports.typescript = typescript;
