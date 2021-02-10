module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
  },

  plugins: [
    'vue',
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },

  root: true,

  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
};
