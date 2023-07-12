const disabledByPrettier = require("./disabled-by-prettier");
const { log, supportedFileTypes } = require("./utils");

/**
 * @param {import(".").Options} options - The options
 * @returns {Record<string, unknown>} The eslint config
 */
const node = (options) => {
	if (!options.node) {
		log("Skipping node config");

		return {};
	}

	return {
		overrides: [
			{
				files: options.node.files ?? [supportedFileTypes],
				extends: ["plugin:n/recommended"],
				env: {
					node: true,
				},
				rules: {
					"n/handle-callback-err": "error",
					"n/no-extraneous-require": "off",
					"n/no-missing-import": "off",
					"n/no-new-require": "error",
					"n/no-path-concat": "error",
					"n/no-unpublished-import": "off",
					"n/no-unpublished-require": "off",
				},
			},
		],
	};
};

exports.node = node;
