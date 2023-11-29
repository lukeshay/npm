const { createConfig } = require("@lshay/eslint-config-flat")

const config = createConfig({
	jsdoc: true,
	node: true,
	parserOptions: {
		project: ["./tsconfig.json"],
	},
	prettier: true,
})

module.exports = config
