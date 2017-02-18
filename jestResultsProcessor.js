module.exports = function() {  
    console.log('Processing code coverage...');
    require('./node_modules/ts-jest/coverageprocessor').apply(this, arguments);
    console.log('Reporting as JUnit XML...');
    return require('./node_modules/jest-junit').apply(this, arguments);
};