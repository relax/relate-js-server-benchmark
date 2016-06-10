import React, {PropTypes, Component} from 'react';

export default class Recursive extends Component {
  static propTypes = {
    depth: PropTypes.number.isRequired,
    breadth: PropTypes.number.isRequired
  };

  render () {
    const {depth, breadth} = this.props;

    if (depth <= 0) {
      return <div>abcdefghij</div>;
    }

    let children = [];
    for (let i = 0; i < breadth; i++) {
      children.push(<Recursive key={i} depth={depth - 1} breadth={breadth} />);
    }

    return (
      <div>{children}</div>
    );
  }
}
