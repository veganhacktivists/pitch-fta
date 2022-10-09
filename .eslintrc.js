/** @type import('eslint').Linter.Config */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['./*.js', './*.ts'],
      rules: {
        'import/no-extraneous-dependencies': [
          'warn',
          { devDependencies: true },
        ],
      },
    },
  ],
  plugins: [],
  rules: {
    'import/extensions': ['off'],
    'react/button-has-type': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/require-default-props': ['off'],
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'arrow-function' },
    ],
    'react/prop-types': ['off'],
    'prefer-arrow-callback': ['warn'],
    'import/prefer-default-export': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    '@typescript-eslint/no-empty-interface': ['off'],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        controlComponents: ['JetCheckbox'],
      },
    ],
    'react/no-unescaped-entities': ['off'],
    'no-plusplus': ['off'],
  },
  ignorePatterns: ['*.js'],
}
