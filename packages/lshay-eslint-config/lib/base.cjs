const getOffMyLawn = require("eslint-config-get-off-my-lawn");

/** @type {Array} */
const overrides = getOffMyLawn.overrides;

const tsOverride = overrides.find(({ parser }) => parser === "@typescript-eslint/parser");
const filteredOverrides = overrides.filter(({ parser }) => parser !== "@typescript-eslint/parser");

if (tsOverride) {
	tsOverride.rules = {
		...tsOverride.rules,
		"@typescript-eslint/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: true }],
		"@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-confusing-void-expression": "off",
		"@typescript-eslint/member-ordering": "error",
	};
}

if (getOffMyLawn.plugins.includes("@next/next")) {
	getOffMyLawn.rules = {
		...Object.fromEntries(Object.entries(getOffMyLawn.rules).filter(([key]) => !key.startsWith("@next/next"))),
		"@next/next/google-font-display": "error",
		"@next/next/google-font-preconnect": "error",
		"@next/next/inline-script-id": "error",
		"@next/next/next-script-for-ga": "error",
		"@next/next/no-assign-module-variable": "error",
		"@next/next/no-before-interactive-script-outside-document": "error",
		"@next/next/no-css-tags": "error",
		"@next/next/no-document-import-in-page": "error",
		"@next/next/no-duplicate-head": "error",
		"@next/next/no-head-element": "error",
		"@next/next/no-head-import-in-document": "error",
		"@next/next/no-html-link-for-pages": "error",
		"@next/next/no-img-element": "error",
		"@next/next/no-page-custom-font": "error",
		"@next/next/no-script-component-in-head": "error",
		"@next/next/no-styled-jsx-in-document": "error",
		"@next/next/no-sync-scripts": "error",
		"@next/next/no-title-in-document-head": "error",
		"@next/next/no-typos": "error",
		"@next/next/no-unwanted-polyfillio": "error",
	};
}

const config = {
	...getOffMyLawn,
	overrides: [...filteredOverrides, tsOverride],
	rules: {
		...getOffMyLawn.rules,
		"accessor-pairs": "off",
		"import/no-duplicates": ["error", { "prefer-inline": true }],
		"no-new": "off",
	},
};

module.exports = config;
