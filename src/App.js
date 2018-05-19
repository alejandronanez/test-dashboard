import React, { Component } from 'react';
import './App.css';
import { generateDummyTest } from './utils';
import { Test } from './Test';
import { TestsWrapper, Wrapper } from './style';
import Immutable from 'seamless-immutable';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tests: [
        { description: 'should be type safe', run: generateDummyTest() },
        {
          description: 'should return a beautiful component',
          run: generateDummyTest(),
        },
        {
          description: 'should call the api with the right url',
          run: generateDummyTest(),
        },
        {
          description: 'should fetch more than one user',
          run: generateDummyTest(),
        },
        {
          description: 'should teach you the meaning of life',
          run: generateDummyTest(),
        },
        {
          description: 'should not call the backend',
          run: generateDummyTest(),
        },
      ],
      testSuite: new Immutable({
        notStarted: {},
        running: [],
        passed: [],
        failed: [],
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
      testSuite: Immutable.setIn(testSuite, ['notStarted'], tests),
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
    test.run(testResult => {
      const { testSuite } = this.state;
      const passedTest = testResult
        ? Immutable(testSuite.passed).concat(test)
        : testSuite.passed;
      const failedTest = !testResult
        ? Immutable(testSuite.failed).concat(test)
        : testSuite.failed;
      const runningTest = testSuite.running.filter(
        value => value.description !== test.description
      );

      const updatedTestSuite = Immutable.merge(testSuite, {
        passed: passedTest,
        failed: failedTest,
        running: runningTest,
      });

      this.setState(
        prevState => ({
          testSuite: updatedTestSuite,
          failed: updatedTestSuite.failed.length,
          passed: updatedTestSuite.passed.length,
          total:
            updatedTestSuite.failed.length + updatedTestSuite.passed.length,
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
    const removedStartedTests = Immutable.setIn(testSuite, ['notStarted'], []);
    const newTestSuite = Immutable.setIn(
      removedStartedTests,
      ['running'],
      testSuite.notStarted
    );

    this.setState(
      () => ({
        running: true,
        testSuite: newTestSuite,
      }),
      this.triggerTests
    );
  };

  renderTestGroup = testGroup => {
    return Array.from(this.state.testSuite[testGroup]).map((test, index) => (
      <Test key={index} group={testGroup} description={test.description} />
    ));
  };

  render() {
    const { failed, passed, total, finished, running } = this.state;

    return (
      <Wrapper>
        <h1>App</h1>
        <h2>Passed: {passed}</h2>
        <h2>Failed: {failed}</h2>
        <h2>Total: {total}</h2>
        {finished && <h2>FINISHED!</h2>}
        <button disabled={finished || running} onClick={this.handleStartTests}>
          Start tests
        </button>
        <TestsWrapper>
          {this.renderTestGroup('notStarted')}
          {this.renderTestGroup('running')}
          {this.renderTestGroup('passed')}
          {this.renderTestGroup('failed')}
        </TestsWrapper>
      </Wrapper>
    );
  }
}

export default App;
