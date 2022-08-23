const prettierPluginPackagejson = require("prettier-plugin-packagejson");
const prettierPluginTailwindcss = require("prettier-plugin-tailwindcss");

const config = {
  overrides: [
    {
      files: ["*.yml", "*.yaml"],
      options: {
        tabWidth: 4,
      },
    },
  ],
  plugins: [prettierPluginPackagejson, prettierPluginTailwindcss],
  printWidth: 120,
  trailingComma: "all",
};

module.exports = config;
