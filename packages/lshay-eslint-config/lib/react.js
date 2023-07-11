const { supportedFileTypes } = require("./utils");

module.exports = {
	overrides: [
		{
			files: [supportedFileTypes],
			env: {
				browser: true,
			},
			extends: [
				"plugin:import/react",
				"plugin:react/recommended",
				"plugin:react-hooks/all",
				"plugin:jsx-a11y/strict",
				"plugin:ssr-friendly/recommended",
				"plugin:react-perf/recommended",
			],
			plugins: ["sonar", "validate-jsx-nesting", "react-refresh"],
			rules: {
				"jsx-a11y/alt-text": ["error", { img: ["Image", "Img"] }],
				"jsx-a11y/lang": "error",
				"jsx-a11y/no-aria-hidden-on-focusable": "error",
				"jsx-a11y/prefer-tag-over-role": "error",
				"react-hooks/exhaustive-deps": "error",
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
				"react/jsx-fragments": "error",
				"react/jsx-no-literals": "off",
				"react/jsx-no-useless-fragment": "error",
				"react/jsx-pascal-case": "error",
				"react/no-danger": "error",
				"react/no-unsafe": ["error", { checkAliases: true }],
				"react/self-closing-comp": "error",
				"sonar/no-hook-setter-in-body": "error",
				"sonar/no-useless-react-setstate": "error",
				"validate-jsx-nesting/no-invalid-jsx-nesting": "error",
				"react-refresh/only-export-components": ["error", { allowConstantExport: true, checkJS: true }],
			},
		},
	],
};