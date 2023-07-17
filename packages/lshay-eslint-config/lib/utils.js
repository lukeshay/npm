const { readFileSync } = require("node:fs");
const { mergeAndConcat } = require("merge-anything");
const { parse } = require("semver");

const DEFAULT_PACKAGE_JSON = {
	dependencies: {},
	devDependencies: {},
	type: "commonjs",
};

const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

const mergedPackageJson = mergeAndConcat(DEFAULT_PACKAGE_JSON, packageJson);

/**
 * @param {string} name - Name of the dependency
 * @returns {boolean} Whether the dependency is installed
 */
const hasDependency = (name) => {
	return Boolean(mergedPackageJson.dependencies[name]) || Boolean(mergedPackageJson.devDependencies[name]);
};

/**
 * @param {string} name - Name of the dependency
 * @returns {Semver | null | undefined} Version of the dependency
 */
const getVersion = (name) => parse(mergedPackageJson.dependencies[name] ?? mergedPackageJson.devDependencies[name]);

const log = (...arguments_) => Boolean(process.env.DEBUG) && console.log("@lshay/eslint-config:", ...arguments_);

const allTestDirectories = [
	"**/__e2e__/**",
	"**/__e2es__/**",
	"**/__spec__/**",
	"**/__specs__/**",
	"**/__test__/**",
	"**/__tests__/**",
	"**/e2e/**",
	"**/e2es/**",
	"**/spec/**",
	"**/specs/**",
	"**/test/**",
	"**/tests/**",
];
const testExtensions = ["*.test", "*.spec", "*.e2e"];
const allTsExtensions = ["ts", "tsx"];
const allJsExtensions = ["js", "jsx"];
const allExtensions = [...allJsExtensions, ...allTsExtensions];
const allTsTestExtensions = allTsExtensions.flatMap((extension) =>
	testExtensions.map((testExtension) => `${testExtension}.${extension}`),
);
const allJsTestExtensions = allJsExtensions.flatMap((extension) =>
	testExtensions.map((testExtension) => `${testExtension}.${extension}`),
);
const allTestExtensions = allExtensions.flatMap((extension) =>
	testExtensions.map((testExtension) => `${testExtension}.${extension}`),
);
const supportedTsTestFileTypes = `**/*{${allTsTestExtensions.join(",")}}`;
const supportedJsTestFileTypes = `**/*{${allJsTestExtensions.join(",")}}`;
const supportedTestFileTypes = `**/*{${allTestExtensions.join(",")}}`;
const supportedTsFileTypes = `**/*{${allTsExtensions.join(",")}}`;
const supportedJsFileTypes = `**/*{${allJsExtensions.join(",")}}`;
const supportedFileTypes = `**/*{${allExtensions.join(",")}}`;

/**
 * @param {import(".").Options} options - The options
 * @returns {string} The source type
 */
exports.getSourceType = (options) => options.sourceType ?? mergedPackageJson.type ?? "commonjs";

exports.allTestDirectories = allTestDirectories;
exports.allTestExtensions = allTestExtensions;
exports.allTsExtensions = allTsExtensions;
exports.allJsExtensions = allJsExtensions;
exports.allExtensions = allExtensions;
exports.allTsTestExtensions = allTsTestExtensions;
exports.allJsTestExtensions = allJsTestExtensions;
exports.allTestExtensions = allTestExtensions;
exports.supportedTsTestFileTypes = supportedTsTestFileTypes;
exports.supportedJsTestFileTypes = supportedJsTestFileTypes;
exports.supportedTestFileTypes = supportedTestFileTypes;
exports.supportedTsFileTypes = supportedTsFileTypes;
exports.supportedJsFileTypes = supportedJsFileTypes;
exports.supportedFileTypes = supportedFileTypes;

exports.packageJson = mergedPackageJson;
exports.hasDependency = hasDependency;
exports.getVersion = getVersion;
exports.log = log;
