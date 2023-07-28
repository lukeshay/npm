const { createConfig } = require("./lib")

module.exports = createConfig({
	commonjs: true,
	node: true,
	parserOptions: {
		project: "./tsconfig.json",
	},
	prettier: true,
})
