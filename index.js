/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

const byDurationDesc = (a, b) => {
  const durationA = a.duration;
  const durationB = b.duration;

  if (durationA < durationB) {
    return 1;
  }

  if (durationA > durationB) {
    return -1;
  }

  return 0;
};

class TimingReporter {
  constructor(globalConfig, options) {
    this.globalConfig = globalConfig;
    this.options = options;
    this.timings = [];
  }

  onRunStart() {
    this.timings = [];
  }

  onRunComplete() {
    const json = JSON.stringify(this.timings.sort(byDurationDesc), null, 2);

    if (this.timings.length > 0) {
      console.log(`Timings for ${this.timings.length} test suites:`);
      console.log(json);
    }
  }

  onTestResult(test, testResult) {
    const timing = this.options.verbose
      ? {
        testSuite: test.path,
        duration: test.duration,
        testCases: testResult.testResults.map(r => ({
          testCase: r.fullName,
          duration: r.duration,
        })).sort(byDurationDesc),
      }
      : {
        testSuite: test.path,
        duration: test.duration,
      };

    this.timings.push(timing);
  }
}

module.exports = TimingReporter;
