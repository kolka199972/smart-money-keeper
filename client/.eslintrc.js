module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'space-before-function-paren': 'off',
    'object-curly-spacing': 'off',
    'react/prop-types': 'off',
    'multiline-ternary': 'off',
    indent: 'off'
  }
}
