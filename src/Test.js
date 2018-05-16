import React from 'react';
import {TestWrapper, TestStatus, TestDescription} from './style';

export class Test extends React.Component {
  nameMap = {
    notStarted: 'Not Started',
    running: 'Running',
    failed: 'Failed',
    passed: 'Passed'
  };

  getTestLegend = () => this.nameMap[this.props.group]

  render() {
    const { group, description } = this.props;

    return (
      <TestWrapper status={group}>
        <TestStatus status={group}>
          {this.getTestLegend()}
        </TestStatus>
        <TestDescription>{description}</TestDescription>
      </TestWrapper>
    )
  }
}
