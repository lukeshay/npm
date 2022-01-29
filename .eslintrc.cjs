module.exports = {
  extends: ['get-off-my-lawn', 'plugin:sonarjs/recommended'],
  plugins: ['sonarjs'],
  rules: {
    'unicorn/prefer-export-from': 'off',
  },
  overrides: [{ files: ['test/**/*'], rules: { '@typescript-eslint/unbound-method': 'off' } }],
};
