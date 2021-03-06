module.exports = {
  root: true,
  env:  {node: true},

  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript',
  ],

  rules: {
    'no-console':                  process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger':                 process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle':                ['error', 'always-multiline'],
    'semi':                        'off',
    'indent':                      'off',
    'object-curly-spacing':        'off',
    'object-property-newline':     'off',
    'space-before-function-paren': 'off',
    'no-multi-spaces':             'off',
    'key-spacing':                 'off',
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],

      env: {
        jest: true,
      },
    },
  ],
};
