export type ConfigOptions = {

	/**
	 * Whether to enable browser rules.
	 */
	browser?: boolean

	/**
	 * Whether to enable CommonJS rules.
	 */
	commonjs?: boolean

	/**
	 * Allowed casing for file names.
	 *
	 * Default `["kebabCase"]`.
	 */
	fileNameCases?: (
		| "anyCase"
		| "camelCase"
		| "kebabCase"
		| "pascalCase"
		| "snakeCase"
	)[]

	/**
	 * The files to lint.
	 */
	files?: string[]

	/**
	 * The files to lint globally.
	 */
	globalFiles?: string[]

	/**
	 * The files to ignore globally.
	 */
	globalIgnores?: string[]

	/**
	 * Whether to enable HTML rules.
	 */
	html?: boolean

	/**
	 * The files to ignore.
	 */
	ignores?: string[]

	/**
	 * Whether to enable JSDoc rules.
	 */
	jsdoc?: boolean

	/**
	 * Whether to enable Node rules.
	 */
	node?: boolean

	/**
	 * The parser options.
	 */
	parserOptions: {
		[other: string]: unknown
		project: string[] | string
	}

	/**
	 * Whether to disable rules that interfere with Prettier.
	 */
	prettier?: boolean

	/**
	 * Whether to enable React rules.
	 */
	react?: boolean

	/**
	 * Whether to enable React Native rules.
	 */
	reactNative?: boolean

	/**
	 * Whether to enable Vitest rules.
	 */
	vitest?: boolean
}

export function createConfig(options: ConfigOptions): Record<string, unknown>[]
