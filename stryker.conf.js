module.exports = function(config) {
  config.set({
    coverageAnalysis: 'off',
    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
    ],
    logLevel: 'trace',
    mutate: [
      'src/**/*.ts',
      'src/**/*.tsx',
      '!src/**/__tests__/*'
    ],
    mutator: 'typescript',
    reporter: ['html', 'clear-text', 'progress', 'dashboard'],
    testRunner: 'jest',
    // transpilers: ['typescript'],
    tsconfigFile: 'tsconfig.json',
  });
};
