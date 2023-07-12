const { mergeAndConcat } = require("merge-anything");
const { log, supportedFileTypes } = require("./utils");

/**
 * @param {import(".").Options} options - The options
 * @returns {Record<string, unknown>} The eslint config
 */
const react = (options) => {
	if (!options.react) {
		log("Skipping react config");

		return {};
	}

	const config = {
		env: {
			browser: !options.reactNative,
		},
		extends: [
			"plugin:import/react",
			"plugin:react/recommended",
			"plugin:react-hooks/all",
			"plugin:react-perf/recommended",
		],
		plugins: ["sonar", "validate-jsx-nesting", "react-refresh"],
		rules: {
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
			"react-hooks/exhaustive-deps": "error",
			"react-refresh/only-export-components": ["error", { allowConstantExport: true, checkJS: true }],
			"sonar/no-hook-setter-in-body": "error",
			"sonar/no-useless-react-setstate": "error",
			"validate-jsx-nesting/no-invalid-jsx-nesting": "error",
		},
	};

	const reactNativeConfig = options.reactNative
		? {}
		: {
				extends: ["plugin:jsx-a11y/strict", "plugin:ssr-friendly/recommended"],
				rules: {
					"jsx-a11y/alt-text": ["error", { img: ["Image", "Img"] }],
					"jsx-a11y/lang": "error",
					"jsx-a11y/no-aria-hidden-on-focusable": "error",
					"jsx-a11y/prefer-tag-over-role": "error",
				},
		  };

	return {
		overrides: [
			{
				files: options.react.files ?? [supportedFileTypes],
				...mergeAndConcat(config, reactNativeConfig),
			},
		],
	};
};

exports.react = react;
