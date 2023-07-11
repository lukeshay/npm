const { readFileSync } = require("fs");
const { mergeAndConcat } = require("merge-anything");
const { parse } = require("semver");

const DEFAULT_PACKAGE_JSON = {
	type: "commonjs",
	dependencies: {},
	devDependencies: {},
};

const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

const mergedPackageJson = mergeAndConcat(DEFAULT_PACKAGE_JSON, packageJson);

/**
 * @param {string} name
 * @returns {boolean}
 */
const hasDependency = (name) => {
	return Boolean(mergedPackageJson.dependencies[name]) || Boolean(mergedPackageJson.devDependencies[name]);
};

/** @param {string} name */
const getVersion = (name) => parse(mergedPackageJson.dependencies[name] ?? mergedPackageJson.devDependencies[name]);

const log = (...args) => Boolean(process.env.DEBUG) && console.log("@lshay/eslint-config:", ...args);

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
const allTestExtensions = ["*.test", "*.spec", "*.e2e"];
const allTsExtensions = ["ts", "tsx"];
const allJsExtensions = ["js", "jsx", ...allTsExtensions];
const allTsTestExtensions = allTsExtensions.flatMap((ext) => allTestExtensions.map((testExt) => `${testExt}.${ext}`));
const allJsTestExtensions = allJsExtensions.flatMap((ext) => allTestExtensions.map((testExt) => `${testExt}.${ext}`));
const supportedTsTestFileTypes = `**/*{${allTsTestExtensions.join(",")}}`;
const supportedTestFileTypes = `**/*{${allJsTestExtensions.join(",")}}`;
const supportedTsFileTypes = `**/*{${allTsExtensions.join(",")}}`;
const supportedFileTypes = `**/*{${allJsExtensions.join(",")}}`;

exports.allTestDirectories = allTestDirectories;
exports.allTestExtensions = allTestExtensions;
exports.allTsExtensions = allTsExtensions;
exports.allJsExtensions = allJsExtensions;
exports.allTsTestExtensions = allTsTestExtensions;
exports.allJsTestExtensions = allJsTestExtensions;
exports.supportedTsTestFileTypes = supportedTsTestFileTypes;
exports.supportedTestFileTypes = supportedTestFileTypes;
exports.supportedTsFileTypes = supportedTsFileTypes;
exports.supportedFileTypes = supportedFileTypes;

exports.packageJson = mergedPackageJson;
exports.hasDependency = hasDependency;
exports.getVersion = getVersion;
exports.log = log;
