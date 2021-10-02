const coverage = process.env.NODE_ENV === 'test';

const watchMode = process.argv.indexOf('--watch') > -1;

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'jasmine'],
    files: [
      'src/*.test.ts',
    ],
    exclude: [
      'src/*.swp',
    ],
    preprocessors: {
      'src/**/*.ts': ['browserify'],
      "src/**/*.tsx":"karma-typescript"
    },
    reporters: ['mocha', coverage && 'coverage-istanbul'].filter(r => r),
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: watchMode,
    browsers: ['ChromeHeadless'],
    singleRun: !watchMode,
    concurrency: Infinity,

    coverageIstanbulReporter: {
      reports: ['lcovonly', 'text-summary'],
    },
    browserify: {
      debug: true,
      transform: ['babelify'],
    },
  });
};
