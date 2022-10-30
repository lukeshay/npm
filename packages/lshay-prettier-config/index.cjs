const config = {
	overrides: [
		{
			files: ["*.yml", "*.yaml"],
			options: {
				tabWidth: 4,
			},
		},
		{
			files: ["package.json"],
			plugins: [require("prettier-plugin-packagejson")],
		},
		{
			files: ["*.json", "!package.json"],
			options: {
				jsonRecursiveSort: false,
				plugins: [require("prettier-plugin-sort-json")],
			},
		},
		{
			files: ["*.astro"],
			plugins: [require("prettier-plugin-astro")],
		},
	],
	plugins: [require("prettier-plugin-tailwindcss"), require("prettier-plugin-sh"), require("prettier-plugin-jsdoc")],
	printWidth: 120,
	trailingComma: "all",
	useTabs: true,
};

module.exports = config;
