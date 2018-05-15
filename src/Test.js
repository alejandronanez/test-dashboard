import React from 'react';

export class Test extends React.Component {
  render() {
    const { group, description } = this.props;

    return (
      <div>
        {group} - {description}
      </div>
    )
  }
}
