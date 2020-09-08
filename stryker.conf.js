/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = function(config) {
  config.set({
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
    maxConcurrentTestRunners: 5,
    mutate: [
      'src/**/*.ts',
      'src/**/*.tsx',
      '!src/**/__tests__/*'
    ],
    mutator: 'typescript',
    jest: {
      projectType: 'create-react-app'
    },
    reporters: ['html', 'clear-text', 'progress', 'dashboard'],
    testRunner: 'jest',
    timeoutMS: 60000,
    tsconfigFile: 'tsconfig.json',
  });
};
