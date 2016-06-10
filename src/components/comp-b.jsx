import React, {PropTypes, Component} from 'react';
import {dataConnect} from 'relate-js';

@dataConnect(
  () => ({
    fragments: {
      page: {
        _id: 1,
        title: 1,
        date: 1
      }
    }
  })
)
export default class CompB extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  };

  render () {
    let result;

    if (this.props.loading) {
      result = <div>Loading</div>;
    } else {
      result = <div>Done</div>;
    }

    return result;
  }
}
