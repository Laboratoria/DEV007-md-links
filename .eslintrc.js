/* eslint-disable linebreak-style */
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'linebreak-style': ['error', 'windows'], // Cambiado de 'unix' a 'windows'
    semi: ['error', 'always'],
    'no-console': 'off', // Desactivar la regla no-console
  },
};
