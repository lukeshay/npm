const config = {
	arrowParens: "always",
	bracketSameLine: false,
	bracketSpacing: true,
	embeddedLanguageFormatting: "auto",
	endOfLine: "lf",
	htmlWhitespaceSensitivity: "css",
	insertPragma: false,
	jsxSingleQuote: false,
	overrides: [
		{
			files: ["**/.{yml,yaml}"],
			options: {
				tabWidth: 4,
			},
		},
		{
			files: ["**/package.json"],
			plugins: [require.resolve("prettier-plugin-packagejson")],
		},
		{
			files: ["**/*.json", "!**/package.json"],
			options: {
				jsonRecursiveSort: true,
				plugins: [require.resolve("prettier-plugin-sort-json")],
			},
		},
		{
			files: ["**/*.astro"],
			options: {
				parser: "astro",
			},
			plugins: [require.resolve("prettier-plugin-astro")],
		},
	],
	plugins: [
		require.resolve("prettier-plugin-tailwindcss"),
		require.resolve("prettier-plugin-sh"),
		require.resolve("prettier-plugin-jsdoc"),
	],
	printWidth: 80,
	proseWrap: "preserve",
	quoteProps: "as-needed",
	rangeEnd: Number.POSITIVE_INFINITY,
	rangeStart: 0,
	requirePragma: false,
	semi: false,
	singleAttributePerLine: false,
	singleQuote: false,
	tabWidth: 2,
	trailingComma: "all",
	useTabs: true,
	vueIndentScriptAndStyle: false,
}

module.exports = config
