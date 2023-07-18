const config = {
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
			plugins: [require.resolve("prettier-plugin-astro")],
		},
	],
	plugins: [
		require.resolve("prettier-plugin-tailwindcss"),
		require.resolve("prettier-plugin-sh"),
		require.resolve("prettier-plugin-jsdoc"),
	],
	printWidth: 120,
	trailingComma: "all",
	useTabs: true,
};

module.exports = config;
