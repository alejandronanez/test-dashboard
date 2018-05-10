import React, { Component } from 'react';
import './App.css';
import { generateDummyTest } from './utils';
import Immutable from 'seamless-immutable';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tests: [
        { description: 'should be type safe' },
        { description: 'should return a beautiful component' },
        { description: 'should call the api with the right url' },
        { description: 'should fetch more than one user' },
        { description: 'should teach you the meaning of life' },
        { description: 'should not call the backend' },
      ],
      testSuite: new Immutable({
        notStarted: {},
        running: {},
        passed: {},
        failed: {},
      }),
      finished: false,
      running: false,
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

    this.setState(() => ({
      testSuite: Immutable.setIn(testSuite, ['notStarted'], tests)
    }));
  };

  updateTotals = () => {
    if (this.state.tests.length === this.state.total) {
      this.setState({
        running: false,
        finished: true,
      });
    }
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
          failed: failedTest.size,
          passed: passedTest.size,
          total: failedTest.size + passedTest.size,
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
    const removedStartedTests = Immutable.setIn(testSuite, ['notStarted'], {});
    const newTestSuite = Immutable.setIn(removedStartedTests, ['running'], testSuite.notStarted);

    this.setState(
      prevState => ({
        running: true,
        testSuite: newTestSuite
      }),
      this.triggerTests
    );
  };

  renderTestGroup = testGroup => {
    return Array.from(this.state.testSuite[testGroup]).map(test => (
      <div key={test.description}>
        {testGroup} - {test.description}
      </div>
    ));
  };

  render() {
    const { failed, passed, total, finished, running } = this.state;

    return (
      <section>
        <h1>App</h1>
        <h2>Passed: {passed}</h2>
        <h2>Failed: {failed}</h2>
        <h2>Total: {total}</h2>
        {finished && <h2>FINISHED!</h2>}
        <button disabled={finished || running} onClick={this.handleStartTests}>
          Start tests
        </button>
        {this.renderTestGroup('notStarted')}
        {this.renderTestGroup('running')}
        {this.renderTestGroup('passed')}
        {this.renderTestGroup('failed')}
      </section>
    );
  }
}

export default App;
