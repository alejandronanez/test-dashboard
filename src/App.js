import React, { Component } from 'react';
import './App.css';
import { generateDummyTest } from './utils';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tests: [
        { description: 'commas are rotated properly' },
        { description: 'exclamation points stand up straight' },
        { description: "run-on sentences don't run forever" },
        { description: 'question marks curl down, not up' },
        { description: 'semicolons are adequately waterproof' },
        { description: 'capital letters can do yoga' },
      ],
      testSuite: {
        notStarted: new Map(),
        running: new Map(),
        passed: new Map(),
        failed: new Map(),
      },
      finished: false,
      passed: 0,
      failed: 0,
      total: 0,
    };
  }

  componentDidMount = () => {
    this.getNotStartedTests();
  };

  getNotStartedTests = () => {
    const { tests, testSuite } = this.state;

    const updatedTestSuite = tests.reduce(
      (testMap, test, i) => ({
        ...testMap,
        notStarted: testMap.notStarted.set(`${i}`, test),
      }),
      testSuite
    );

    this.setState(() => ({ testSuite: updatedTestSuite }));
  };

  updateTotals = () => {
    this.setState(prevState => ({
      failed: this.state.testSuite.failed.size,
      passed: this.state.testSuite.passed.size,
      total:
        this.state.testSuite.failed.size + this.state.testSuite.passed.size,
    }));
  };

  individualUnitTest = (test, index) => {
    generateDummyTest()(testResult => {
      const { testSuite } = this.state;
      const clonedPassedTest = new Map(testSuite.passed);
      const clonedFailedTest = new Map(testSuite.failed);
      const clonedRunningTest = new Map(testSuite.running);

      const passedTest = testResult
        ? clonedPassedTest.set(index, test)
        : clonedPassedTest;
      const failedTest = !testResult
        ? clonedFailedTest.set(index, test)
        : clonedFailedTest;
      clonedRunningTest.delete(index);

      this.setState(
        prevState => ({
          testSuite: {
            ...prevState.testSuite,
            running: clonedRunningTest,
            passed: passedTest,
            failed: failedTest,
          },
        }),
        this.updateTotals
      );
    });
  };

  triggerTests = () => {
    const { running } = this.state.testSuite;

    running.forEach(this.individualUnitTest);
  };

  handleStartTests = () => {
    const { testSuite } = this.state;
    const running = testSuite.notStarted;

    this.setState(
      prevState => ({
        testSuite: {
          ...prevState.testSuite,
          notStarted: new Map(),
          running,
        },
      }),
      this.triggerTests
    );
  };

  renderTestGroup = testGroup => {
    return Array.from(this.state.testSuite[testGroup].values()).map(test => (
      <div key={test.description}>
        {testGroup} - {test.description}
      </div>
    ));
  };

  render() {
    const { failed, passed, total } = this.state;

    return (
      <section>
        <h1>App</h1>
        <h2>Passed: {passed}</h2>
        <h2>Failed: {passed}</h2>
        <h2>Total: {total}</h2>
        <button onClick={this.handleStartTests}>Start tests</button>
        {this.renderTestGroup('notStarted')}
        {this.renderTestGroup('running')}
        {this.renderTestGroup('passed')}
        {this.renderTestGroup('failed')}
      </section>
    );
  }
}

export default App;
