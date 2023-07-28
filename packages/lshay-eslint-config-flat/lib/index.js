/* @ts-check */

const js = require("@eslint/js")
const imprt = require("eslint-plugin-import")
// eslint-disable-next-line id-length
const n = require("eslint-plugin-n")
const promise = require("eslint-plugin-promise")
const security = require("eslint-plugin-security")
const perfectionist = require("eslint-plugin-perfectionist")
const regexp = require("eslint-plugin-regexp")
const sonarjs = require("eslint-plugin-sonarjs")
// Const sonar = require( "eslint-plugin-sonar")
const jsdoc = require("eslint-plugin-jsdoc")
const unicorn = require("eslint-plugin-unicorn")
const tsdoc = require("eslint-plugin-tsdoc")
const typescript = require("@typescript-eslint/eslint-plugin")
const typescriptParser = require("@typescript-eslint/parser")
const totalFunctions = require("eslint-plugin-total-functions")
const etc = require("eslint-plugin-etc")
const deprecation = require("eslint-plugin-deprecation")
const fp = require("eslint-plugin-fp")
const preferEarlyReturn = require("@regru/eslint-plugin-prefer-early-return")
const globals = require("globals")
const { merge, mergeAndConcat } = require("merge-anything")
const htmlParser = require("@html-eslint/parser")
const html = require("@html-eslint/eslint-plugin")
const react = require("eslint-plugin-react")
const reactHooks = require("eslint-plugin-react-hooks")
const reactPerf = require("eslint-plugin-react-perf")
const validateJSXNesting = require("eslint-plugin-validate-jsx-nesting")
const reactRefresh = require("eslint-plugin-react-refresh")
const jsxA11y = require("eslint-plugin-jsx-a11y")
const ssrFriendly = require("eslint-plugin-ssr-friendly")
const reactNative = require("eslint-plugin-react-native")
const reactNativeCommunity = require("@react-native-community/eslint-plugin")
const vitest = require("eslint-plugin-vitest")

const TS_EXTENSIONS = ["ts", "tsx"]
const JS_EXTENSIONS = ["js", "jsx"]
const ALL_EXTENSIONS = [...JS_EXTENSIONS, ...TS_EXTENSIONS]

const CHERRY_PICKED_BASE_RULES = {
	"@regru/prefer-early-return/prefer-early-return": [
		"warn",
		{
			maximumStatements: 1,
		},
	],
	"@typescript-eslint/adjacent-overload-signatures": "off",
	"@typescript-eslint/consistent-type-definitions": ["error", "type"],
	"@typescript-eslint/consistent-type-exports": [
		"error",
		{ fixMixedExportsWithInlineTypeSpecifier: true },
	],
	"@typescript-eslint/consistent-type-imports": [
		"error",
		{ fixStyle: "inline-type-imports", prefer: "type-imports" },
	],
	"@typescript-eslint/explicit-function-return-type": "off",
	"@typescript-eslint/init-declarations": "off",
	"@typescript-eslint/member-ordering": "off",
	"@typescript-eslint/naming-convention": "off",
	"@typescript-eslint/no-restricted-imports": "off",
	"@typescript-eslint/no-type-alias": "off",
	"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
	"@typescript-eslint/prefer-readonly-parameter-types": "off",
	"@typescript-eslint/strict-boolean-expressions": "off",
	"deprecation/deprecation": "warn",
	"etc/no-const-enum": "error",
	"etc/no-enum": "error",
	"etc/no-implicit-any-catch": "error",
	"etc/no-misused-generics": "error",
	"etc/no-t": "error",
	"etc/prefer-interface": "off",
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
	"jsdoc/check-indentation": "error",
	"jsdoc/check-line-alignment": "error",
	"jsdoc/no-bad-blocks": "error",
	"jsdoc/no-blank-block-descriptions": "error",
	"jsdoc/no-blank-blocks": "error",
	"jsdoc/no-types": "off",
	"jsdoc/no-undefined-types": "off",
	"jsdoc/require-description": "error",
	"jsdoc/require-description-complete-sentence": "error",
	"jsdoc/require-param-type": "off",
	"jsdoc/require-property-type": "off",
	"jsdoc/require-returns-type": "off",
	"jsdoc/require-throws": "error",
	"jsdoc/sort-tags": "error",
	"max-lines": "off",
	"max-lines-per-function": "off",
	"no-ternary": "off",
	"no-unused-vars": "off",
	"one-var": "off",
	"perfectionist/sort-union-types": "off",
	"sonarjs/no-collapsible-if": "off",
	"sort-keys": "off",
	"total-functions/no-unsafe-readonly-mutable-assignment": "off",
}

const BASE_CONFIG = {
	ignores: ["dist/*", "node_modules/*", "build/*", "coverage/*"],
	languageOptions: {
		globals: {
			...globals.builtin,
			...globals.es2021,
		},
		parser: typescriptParser,
		sourceType: "module",
	},
	plugins: {
		"@regru/prefer-early-return": preferEarlyReturn,
		"@typescript-eslint": typescript,
		deprecation,
		etc,
		fp,
		import: imprt,
		jsdoc,
		perfectionist,
		promise,
		regexp,
		security,
		sonarjs,
		"total-functions": totalFunctions,
		unicorn,
	},
	rules: {
		...js.configs.all.rules,
		...typescript.configs.all.rules,
		...imprt.configs.recommended.rules,
		...imprt.configs.typescript.rules,
		...unicorn.configs.recommended.rules,
		...promise.configs.recommended.rules,
		...security.configs.recommended.rules,
		...regexp.configs.recommended.rules,
		...sonarjs.configs.recommended.rules,
		...jsdoc.configs["recommended-typescript-error"].rules,
		...perfectionist.configs["recommended-natural"].rules,
		...totalFunctions.configs.all.rules,
		...CHERRY_PICKED_BASE_RULES,
	},
	settings: {
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
			},
		},
		node: {
			tryExtensions: ALL_EXTENSIONS.flatMap((extension) => [
				`.${extension}`,
				`.m${extension}`,
				`.c${extension}`,
			]),
		},
	},
}

const TS_ONLY_CONFIG = {
	plugins: {
		tsdoc,
	},
	rules: {
		"jsdoc/require-param": "off",
		"jsdoc/require-returns": "off",
		"tsdoc/syntax": "error",
	},
}

const JS_ONLY_CONFIG = {
	rules: {
		"@typescript-eslint/no-unsafe-argument": "off",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-unsafe-call": "off",
		"@typescript-eslint/no-unsafe-member-access": "off",
		"@typescript-eslint/no-unsafe-return": "off",
	},
}

const NODE_CONFIG = {
	languageOptions: {
		globals: globals.node,
	},
	plugins: {
		// eslint-disable-next-line id-length
		n,
	},
	rules: {
		...n.configs.recommended.rules,
		"n/handle-callback-err": "error",
		"n/no-extraneous-require": "off",
		"n/no-missing-import": "off",
		"n/no-new-require": "error",
		"n/no-path-concat": "error",
		"n/no-unpublished-import": "off",
		"n/no-unpublished-require": "off",
	},
}

const HTML_CONFIG = {
	files: ["*.html", "*.htm"],
	languageOptions: {
		globals: globals.browser,
		parser: htmlParser,
	},
	plugins: {
		"@html-eslint": html,
	},
	rules: {
		...html.configs.recommended.rules,
		"@html-eslint/no-abstract-roles": "error",
		"@html-eslint/no-accesskey-attrs": "error",
		"@html-eslint/no-aria-hidden-body": "error",
		"@html-eslint/no-duplicate-attrs": "error",
		"@html-eslint/no-duplicate-id": "error",
		"@html-eslint/no-inline-styles": "error",
		"@html-eslint/no-multiple-h1": "error",
		"@html-eslint/no-non-scalable-viewport": "error",
		"@html-eslint/no-obsolete-tags": "error",
		"@html-eslint/no-positive-tabindex": "error",
		"@html-eslint/no-skip-heading-levels": "error",
		"@html-eslint/no-target-blank": "error",
		"@html-eslint/require-button-type": "error",
		"@html-eslint/require-doctype": "error",
		"@html-eslint/require-frame-title": "error",
		"@html-eslint/require-img-alt": "error",
		"@html-eslint/require-lang": "error",
		"@html-eslint/require-li-container": "error",
		"@html-eslint/require-meta-description": "error",
		"@html-eslint/require-meta-viewport": "error",
		"@html-eslint/require-title": "error",
		"import/unambiguous": "off",
		"no-inline-comments": "off",
		"spaced-comment": "off",
	},
}

const REACT_BASE_CONFIG = {
	languageOptions: {
		globals: globals.browser,
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
		},
	},
	plugins: {
		react,
		"react-hooks": reactHooks,
		"react-perf": reactPerf,
		"react-refresh": reactRefresh,
		"validate-jsx-nesting": validateJSXNesting,
		// Sonar,
	},
	rules: {
		...imprt.configs.react.rules,
		...react.configs.recommended.rules,
		...reactHooks.configs.recommended.rules,
		...reactPerf.configs.all.rules,
		"react/boolean-prop-naming": [
			"error",
			{
				rule: "^(is|has|are|can|should|did|will)[A-Z]([A-Za-z0-9])+",
				validateNested: true,
			},
		],
		"react/button-has-type": "error",
		"react/hook-use-state": "error",
		"react/jsx-boolean-value": "error",
		"react/jsx-curly-brace-presence": ["error", "never"],
		"react/jsx-fragments": "error",
		"react/jsx-no-literals": "off",
		"react/jsx-no-useless-fragment": "error",
		"react/jsx-pascal-case": "error",
		"react/no-danger": "error",
		"react/no-unsafe": ["error", { checkAliases: true }],
		"react/self-closing-comp": "error",
		"react-hooks/exhaustive-deps": "error",
		"react-refresh/only-export-components": [
			"error",
			{ allowConstantExport: true, checkJS: true },
		],

		/*
		 * "sonar/no-hook-setter-in-body": "error",
		 * "sonar/no-useless-react-setstate": "error",
		 */
		"validate-jsx-nesting/no-invalid-jsx-nesting": "error",
	},
}

const REACT_WEB_CONFIG = {
	plugins: {
		"jsx-a11y": jsxA11y,
		"ssr-friendly": ssrFriendly,
	},
	rules: {
		...jsxA11y.configs.strict.rules,
		...ssrFriendly.configs.recommended.rules,
		"jsx-a11y/alt-text": ["error", { img: ["Image", "Img"] }],
		"jsx-a11y/lang": "error",
		"jsx-a11y/no-aria-hidden-on-focusable": "error",
		"jsx-a11y/prefer-tag-over-role": "error",
	},
}

const REACT_NATIVE_CONFIG = {
	plugins: {
		"@react-native-community": reactNativeCommunity,
		"react-native": reactNative,
	},
	rules: {
		...reactNative.configs.all.rules,
		"@react-native-community/platform-colors": "error",
	},
}

const VITEST_CONFIG = {
	plugins: {
		vitest,
	},
	rules: {
		...vitest.configs.recommended.rules,
		"@typescript-eslint/no-magic-numbers": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-shadow": [
			"error",
			{
				allow: [
					"defaultStatus",
					"event",
					"find",
					"length",
					"name",
					"status",
					"screen",
				],
				builtinGlobals: true,
			},
		],
		"tsdoc/syntax": "off",
		"vitest/assertion-type": "error",
		"vitest/consistent-test-filename": "error",
		"vitest/consistent-test-it": [
			"error",
			{ fn: "test", withinDescribe: "test" },
		],
		"vitest/max-nested-describe": ["error", { max: 1 }],
		"vitest/no-alias-methods": "error",
		"vitest/no-conditional-expect": "error",
		"vitest/no-conditional-in-test": "error",
		"vitest/no-conditional-tests": "error",
		"vitest/no-disabled-tests": "error",
		"vitest/no-done-callback": "error",
		"vitest/no-duplicate-hooks": "error",
		"vitest/no-focused-tests": "error",
		"vitest/no-hooks": "error",
		"vitest/no-mocks-import": "error",
		"vitest/no-standalone-expect": "error",
		"vitest/no-test-prefixes": "error",
		"vitest/no-test-return-statement": "error",
		"vitest/prefer-called-with": "error",
		"vitest/prefer-comparison-matcher": "error",
		"vitest/prefer-each": "error",
		"vitest/prefer-equality-matcher": "error",
		"vitest/prefer-expect-resolves": "error",
		"vitest/prefer-hooks-in-order": "error",
		"vitest/prefer-hooks-on-top": "error",
		"vitest/prefer-lowercase-title": "error",
		"vitest/prefer-mock-promise-shorthand": "error",
		"vitest/prefer-spy-on": "error",
		"vitest/prefer-strict-equal": "error",
		"vitest/prefer-to-be": "error",
		"vitest/prefer-to-be-object": "error",
		"vitest/prefer-to-contain": "error",
		"vitest/prefer-to-have-length": "error",
		"vitest/prefer-todo": "error",
		"vitest/require-hook": "error",
		"vitest/require-to-throw-message": "error",
		"vitest/require-top-level-describes": "error",
	},
}

const BROWSER_CONFIG = {
	languageOptions: {
		globals: globals.browser,
	},
}

const COMMONJS_CONFIG = {
	languageOptions: {
		globals: globals.commonjs,
	},
	rules: {
		"@typescript-eslint/no-require-imports": "off",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-var-requires": "off",
		"unicorn/prefer-module": "off",
	},
}

const PRETTIER_DISABLED_RULES = [
	"@html-eslint/element-newline",
	"@html-eslint/indent",
	"@html-eslint/no-extra-spacing-attrs",
	"@html-eslint/no-multiple-empty-lines",
	"@html-eslint/no-trailing-spaces",
	"@html-eslint/quotes",
	"@html-eslint/require-closing-tags",
	"@typescript-eslint/brace-style",
	"@typescript-eslint/comma-dangle",
	"@typescript-eslint/comma-spacing",
	"@typescript-eslint/func-call-spacing",
	"@typescript-eslint/indent",
	"@typescript-eslint/keyword-spacing",
	"@typescript-eslint/member-delimiter-style",
	"@typescript-eslint/no-extra-parens",
	"@typescript-eslint/no-extra-semi",
	"@typescript-eslint/object-curly-spacing",
	"@typescript-eslint/quotes",
	"@typescript-eslint/semi",
	"@typescript-eslint/semi-spacing",
	"@typescript-eslint/space-before-function-paren",
	"@typescript-eslint/space-infix-ops",
	"@typescript-eslint/space-unary-ops",
	"@typescript-eslint/type-annotation-spacing",
	"array-bracket-newline",
	"array-bracket-spacing",
	"array-element-newline",
	"arrow-parens",
	"arrow-spacing",
	"block-spacing",
	"brace-style",
	"comma-dangle",
	"comma-spacing",
	"comma-style",
	"computed-property-spacing",
	"dot-location",
	"eol-last",
	"func-call-spacing",
	"function-call-argument-newline",
	"function-paren-newline",
	"generator-star-spacing",
	"implicit-arrow-linebreak",
	"indent",
	"jsdoc/tag-lines",
	"jsx-quotes",
	"key-spacing",
	"keyword-spacing",
	"max-len",
	"linebreak-style",
	"multiline-ternary",
	"new-parens",
	"newline-per-chained-call",
	"no-tabs",
	"no-confusing-arrow",
	"no-extra-parens",
	"no-extra-semi",
	"no-floating-decimal",
	"no-mixed-operators",
	"no-mixed-spaces-and-tabs",
	"no-multi-spaces",
	"no-multiple-empty-lines",
	"no-trailing-spaces",
	"no-unexpected-multiline",
	"no-whitespace-before-property",
	"nonblock-statement-body-position",
	"object-curly-newline",
	"object-curly-spacing",
	"object-property-newline",
	"one-var-declaration-per-line",
	"operator-linebreak",
	"padded-blocks",
	"quote-props",
	"rest-spread-spacing",
	"semi",
	"semi-spacing",
	"semi-style",
	"space-before-blocks",
	"space-before-function-paren",
	"space-in-parens",
	"space-infix-ops",
	"space-unary-ops",
	"switch-colon-spacing",
	"template-curly-spacing",
	"template-tag-spacing",
	"unicode-bom",
	"unicorn/empty-brace-spaces",
	"unicorn/no-nested-ternary",
	"unicorn/number-literal-case",
	"wrap-iife",
	"wrap-regex",
	"yield-star-spacing",
]

const PRETTIER_CONFIG = {
	rules: Object.fromEntries(
		PRETTIER_DISABLED_RULES.map((rule) => [rule, "off"]),
	),
}

const configOrEmpty = (enabled, config) => (enabled ? config : {})

exports.createConfig = (options) => {
	const config = mergeAndConcat(
		BASE_CONFIG,
		configOrEmpty(options.parserOptions, {
			languageOptions: {
				parserOptions: options.parserOptions,
			},
		}),
		configOrEmpty(options.files, {
			files: options.files,
		}),
		configOrEmpty(options.ignores, {
			ignores: options.ignores,
		}),
		configOrEmpty(options.node, NODE_CONFIG),
		configOrEmpty(options.react || options.reactNative, REACT_BASE_CONFIG),
		configOrEmpty(options.react && !options.reactNative, REACT_WEB_CONFIG),
		configOrEmpty(options.reactNative && !options.react, REACT_NATIVE_CONFIG),
		configOrEmpty(options.vitest, VITEST_CONFIG),
		configOrEmpty(options.commonjs, COMMONJS_CONFIG),
		configOrEmpty(options.browser, BROWSER_CONFIG),
		configOrEmpty(options.prettier, PRETTIER_CONFIG),
	)

	const tsConfig = merge(
		{
			files: options.files?.filter((file) => file.includes("ts")) ?? [
				"**/*ts",
				"**/*tsx",
			],
		},
		TS_ONLY_CONFIG,
	)
	const jsConfig = merge(
		{
			files: options.files?.filter((file) => file.includes("js")) ?? [
				"**/*js",
				"**/*jsx",
			],
		},
		JS_ONLY_CONFIG,
	)

	return [config, tsConfig, jsConfig, options.html && HTML_CONFIG].filter(
		Boolean,
	)
}
