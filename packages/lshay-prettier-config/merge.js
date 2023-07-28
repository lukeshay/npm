const { mergeAndConcat } = require("merge-anything")

const config = require("./index.js")

module.exports = (prettierConfig) => mergeAndConcat(config, prettierConfig)
