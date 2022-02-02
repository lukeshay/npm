module.exports = {
  extends: ['get-off-my-lawn', 'plugin:sonarjs/recommended'],
  overrides: [
    {
      files: ['test/**/*'],
      rules: { '@typescript-eslint/unbound-method': 'off' },
    },
  ],
  plugins: ['sonarjs'],
  rules: {
    'node/prefer-global/process': 'off',
    'unicorn/prefer-export-from': 'off',
  },
};
