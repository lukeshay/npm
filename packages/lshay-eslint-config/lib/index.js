require("@rushstack/eslint-patch/modern-module-resolution")
const { mergeAndConcat } = require("merge-anything")

const { base } = require("./base")
const { typescript } = require("./typescript")
const { react } = require("./react")
const { reactNative } = require("./react-native")
const { hasDependency, log } = require("./utils")
const { html } = require("./html")
const { vitest } = require("./vitest")
const { node } = require("./node")

/**
 * @typedef RuleSet
 * @typedef Options
 * @property {string[]} files - The files to apply the rules to.
 * @property {RuleSet | boolean | undefined} html - Whether to enable html linting.
 * @property {RuleSet | boolean | undefined} node - Whether to enable node linting.
 * @property {RuleSet | boolean | undefined} prettier - Whether to disable rules that interfere with prettier.
 * @property {RuleSet | boolean | undefined} react - Whether to enable react linting.
 * @property {RuleSet | boolean | undefined} reactNative - Whether to enable react-native linting.
 * @property {RuleSet | boolean | undefined} typescript - Whether to enable typescript linting.
 * @property {RuleSet | boolean | undefined} vitest - Whether to enable vitest linting.
 * @property {string | undefined} ecmaVersion - The ecma version to use.
 * @property {"commonjs" | "module" | undefined} sourceType - The source type to use.
 */

/**
 * Creates an ESLint config based on the provided options. There is a base configuration that is always used, and then
 * additional configurations are added based on the options provided.
 *
 * @param {import(".").Options} options - The options to use when creating the config.
 * @param {Record<string, any>[] | undefined} configs - The configs to merge with.
 * @returns {Record<string, any>} The eslint config.
 */
const createConfig = (options, ...configs) => {
	const mergedConfig = mergeAndConcat(
		base(options),
		react(options),
		typescript(options),
		vitest(options),
		reactNative(options),
		html(options),
		node(options),
		...(configs ?? []),
	)

	log("Final config:", JSON.stringify(mergedConfig))

	return mergedConfig
}

/**
 * Creates an ESLint config based on the provided options. There is a base configuration that is always used, and then
 * additional configurations are added based on the options provided. This function will automatically detect which
 * configurations to add based on the dependencies in the package.json file.
 *
 * @param {Record<string, any>[] | undefined} configs - The configs to merge with.
 * @returns {Record<string, any>} The eslint config.
 */
const createSmartConfig = (...configs) =>
	createConfig(
		{
			html: true,
			node: false,
			prettier: hasDependency("prettier"),
			react: hasDependency("react"),
			reactNative: hasDependency("react-native"),
			typescript: hasDependency("typescript"),
			vitest: hasDependency("vitest"),
		},
		...configs,
	)

exports.createConfig = createConfig
exports.createSmartConfig = createSmartConfig
