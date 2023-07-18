const { log, supportedFileTypes } = require("./utils");

/**
 * The React Native ESLint configuration.
 *
 * @param {import(".").Options} options - The options.
 * @returns {Record<string, unknown>} The eslint config.
 */
const reactNative = (options) => {
	if (!options.reactNative) {
		log("Skipping react-native config");

		return {};
	}

	return {
		overrides: [
			{
				env: {
					"react-native/react-native": true,
				},
				files: options.reactNative.files ?? [supportedFileTypes],
				plugins: ["react-native", "@react-native-community"],
				rules: {
					"@react-native-community/platform-colors": "error",
					"react-native/no-color-literals": "error",
					"react-native/no-inline-styles": "error",
					"react-native/no-raw-text": "error",
					"react-native/no-single-element-style-arrays": "error",
					"react-native/no-unused-styles": "error",
					"react-native/split-platform-components": "error",
				},
			},
		],
	};
};

exports.reactNative = reactNative;
