module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['react-hooks'],
  parser: 'babel-eslint',
  env: {
    jest: true
  },
  // For now i am just turning off eslint rules if i don't like the
  // AirBnB default but this is only for test projects. These should
  // be properly examined and look at other settings for best practice
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'no-console': 'off',
    semi: 'off',
    'class-methods-use-this': 'off',
    'no-trailing-spaces': 'off',
    indent: 'off',
    'react/destructuring-assignment': 'off',
    'global-require': 'off',
    'no-extra-boolean-cast': 'off',
    'no-plusplus': 'off',
    'import/prefer-default-export': 'off',
    'import/no-dynamic-require': 'off',
    'no-unused-expressions': 'off',
    'react/no-unused-prop-types': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/require-default-props': 'off',
    'no-unused-vars': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  globals: {
    fetch: false
  }
}
