module.exports = {
  root: true,
  extends: ['react-native-wcandillon', 'prettier'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['Plugin', '__mocks__'],
  plugins: [
    'react-hooks',
    'simple-import-sort',
    'eslint-plugin-import',
    'react'
  ],
  rules: {
    semi: 0,
    'simple-import-sort/sort': [
      'warn',
      {
        groups: [
          ['^react', '^react-native', '^\\u0000', '^@?\\w', '^[^.]', '^\\.'],
        ],
      },
    ],
    'react/jsx-no-bind': [
      'warn',
      {
        ignoreDOMComponents: false,
        ignoreRefs: false,
        allowArrowFunctions: false,
        allowFunctions: false,
        allowBind: false,
      },
    ],
    'import/order': ['error', { 'newlines-between': 'never' }],
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/extensions': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'ban-ts-ignore': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    "@typescript-eslint/no-empty-function": 0,
    '@typescript-eslint/no-use-before-define': 0,
    'camelcase': 'off',
    '@typescript-eslint/camelcase': 0,
    'eslint no-shadow': 0
  },
  settings: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
};
