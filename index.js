/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

const OUTPUT_AS_JSON = 'json';
const OUTPUT_AS_TEXT = 'text';

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
    if (this.timings.length === 0) return;

    console.log(`Timings for ${this.timings.length} test suites:`);

    if (!this.options.outputAs || this.options.outputAs === OUTPUT_AS_TEXT) {
      for (let timing of this.timings) {
        console.log(`${timing.testSuite}: ${timing.duration}`);

        if (timing.testCases && timing.testCases.length > 0) {
          for (let testCaseTiming of timing.testCases) {
            console.log(`  ${testCaseTiming.testCase}: ${testCaseTiming.duration}`);
          }
        }
      }
    }

    if (this.options.outputAs && this.options.outputAs === OUTPUT_AS_JSON) {
      const json = JSON.stringify(this.timings.sort(byDurationDesc), null, 2);
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
