const { createConfig } = require("@lshay/eslint-config-flat")

module.exports = createConfig({
	commonjs: true,
	node: true,
	parserOptions: {
		project: "./tsconfig.json",
	},
	prettier: true,
})
