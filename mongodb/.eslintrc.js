module.exports = {
  env: {
    es2022: true,
    browser: false,
    node: true
  },
  extends: ['universe', 'prettier'],
  parserOptions: {
    ecmaVersion: '2022'
  },
  rules: {
    'prettier/prettier': 'error'
  },
  ignorePatterns: ['babel.config.js', 'node_modules/', '.git/']
};
