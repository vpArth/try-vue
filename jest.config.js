module.exports = {
  preset:     '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: [
    './tests/jest-setup.js',
  ],

  transform: {
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',

    '^.+\\.vue$':  'vue-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },

  transformIgnorePatterns: [
    'node_modules/(?!(vuetify)/)',
  ],
};
