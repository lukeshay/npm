/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
	cacheDirectory: ".jest-cache",
	collectCoverage: true,
	coverageDirectory: ".jest-coverage",
	coverageReporters: ["lcov", "text", "html"],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
};

module.exports = config;
