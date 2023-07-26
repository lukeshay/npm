const config = require("@lshay/prettier-config")

module.exports = {
	...config,
	plugins: process.env.CHANGESET
		? config.plugins.filter((plug) => !plug.includes("jsdoc"))
		: config.plugins,
}
