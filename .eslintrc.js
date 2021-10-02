module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: ["eslint-config-prettier"],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    settings: {
      react: {
        pragma: 'h',
      }
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: [
      'react',
    ],
    rules: {
      'arrow-parens': 0,
      'react/destructuring-assignment': 0,
      'react/jsx-filename-extension': 0,
      'react/jsx-props-no-spreading': 0,
      'react/prop-types': 0,
    },
  };