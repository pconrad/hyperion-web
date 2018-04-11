module.exports = function(config) {
  config.set({
    coverageAnalysis: 'off',
    logLevel: 'info',
    mutate: [
      'src/**/*.ts?',
      '!src/**/__tests__/*.ts?'
    ],
    mutator: 'typescript',
    reporter: ['html', 'clear-text', 'progress', 'dashboard'],
    testRunner: 'jest',
    transpilers: ['typescript'],
    tsconfigFile: 'tsconfig.json',
  });
};
