module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 0,
    'import/no-unresolved': 0,
    'comma-dangle': 0,
    'no-underscore-dangle': 0,
    'padded-blocks': 0,
    'no-trailing-spaces': 0,
    'func-names': 0
  },
};