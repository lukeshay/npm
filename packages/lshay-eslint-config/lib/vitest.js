const { allTestDirectories, log, supportedTestFileTypes } = require("./utils")

/**
 * The Vitest ESLint configuration.
 *
 * @param {import(".").Options} options - The options.
 * @returns {Record<string, unknown>} The eslint config.
 */
const vitest = (options) => {
	if (!options.vitest) {
		log("Skipping vitest config")

		return {}
	}

	return {
		overrides: [
			{
				extends: ["plugin:vitest/recommended"],
				files: options.vitest.files ?? [
					...allTestDirectories,
					supportedTestFileTypes,
				],
				rules: {
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
			},
		],
	}
}

exports.vitest = vitest
