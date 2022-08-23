const { mergeAndConcat } = require("merge-anything");

const config = require("./index.cjs");

module.exports = (prettierConfig) => mergeAndConcat(config, prettierConfig);
