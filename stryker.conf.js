module.exports = function(config) {
  config.set({
    coverageAnalysis: 'off',
    maxConcurrentTestRunners: 5,
    mutate: [
      'src/**/*.ts',
      'src/**/*.tsx',
      '!src/**/__tests__/*'
    ],
    mutator: 'typescript',
    jest: {
      project: 'react-ts'
    },
    reporter: ['html', 'clear-text', 'progress', 'dashboard'],
    testRunner: 'jest',
    timeoutMs: 60000,
    tsconfigFile: 'tsconfig.json',
  });
};
