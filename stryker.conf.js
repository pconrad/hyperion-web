/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  checkers: ['typescript'],
  coverageAnalysis: 'off',
  files: [
    'package.json',
    'src/**/*.ts',
    'src/**/*.tsx',
    'src/**/__tests__/*',
    'stryker.conf.js',
    'tsconfig.json',
    'tslint.json'
  ],
  mutate: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/__tests__/*'
  ],
  jest: {
    projectType: 'create-react-app'
  },
  reporters: ['html', 'clear-text', 'progress', 'dashboard'],
  testRunner: 'jest',
  timeoutMS: 60000,
  tsconfigFile: 'tsconfig.json',
};
