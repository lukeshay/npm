const config = {
	overrides: [
		{
			files: ["*.yml", "*.yaml"],
			options: {
				tabWidth: 4,
			},
		},
	],
	plugins: [require("prettier-plugin-packagejson"), require("prettier-plugin-tailwindcss")],
	printWidth: 120,
	trailingComma: "all",
	useTabs: true,
};

module.exports = config;
