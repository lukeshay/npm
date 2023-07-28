const { createConfig } = require("./lib")

module.exports = createConfig({
	commonjs: true,
	jsdoc: true,
	node: true,
	parserOptions: {
		project: ["./tsconfig.json"],
	},
	prettier: true,
})
