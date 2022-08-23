module.exports = {
  extends: ["get-off-my-lawn"],
  overrides: [
    {
      files: ["test/**/*"],
      rules: { "@typescript-eslint/unbound-method": "off" },
    },
  ],
  rules: {
    "node/prefer-global/process": "off",
    "unicorn/prefer-export-from": "off",
  },
};
