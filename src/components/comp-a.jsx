import React, {PropTypes, Component} from 'react';
import {dataConnect} from 'relate-js';

import CompB from './comp-b';

@dataConnect(
  () => ({
    fragments: {
      pages: {
        _id: 1,
        title: 1
      }
    }
  })
)
export default class CompA extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    pages: PropTypes.array
  };

  render () {
    let result;

    if (this.props.loading) {
      result = <div>Loading</div>;
    } else {
      result = (
        <div>
          {this.renderPages()}
          <CompB />
        </div>
      );
    }

    return result;
  }

  renderPages () {
    const {pages} = this.props;

    return (
      <div>
        {pages.map(this.renderPage, this)}
      </div>
    );
  }

  renderPage (page) {
    return (
      <div>{page.title}</div>
    );
  }
}
