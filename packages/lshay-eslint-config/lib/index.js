const { mergeAndConcat } = require("merge-anything");

const base = require("./base");
const typescript = require("./typescript");
const react = require("./react");
const { hasDependency, log } = require("./utils");
const html = require("./html");
const prettier = require("./prettier");
const vitest = require("./vitest");

const overrides = [html];

if (hasDependency("react")) {
	log("Adding react overrides");

	overrides.push(react);
}

if (hasDependency("typescript")) {
	log("Adding TypeScript overrides");

	overrides.push(typescript);
}

if (hasDependency("vitest")) {
	log("Adding Vite overrides");

	overrides.push(vitest);
}

if (hasDependency("prettier")) {
	log("Adding Prettier overrides");

	overrides.push(prettier);
}

const config = mergeAndConcat(base, ...overrides);

log("Final config:", JSON.stringify(config));

module.exports = config;
