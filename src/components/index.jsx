import React, {Component} from 'react';
import {rootDataConnect} from 'relate-js';

import CompA from './comp-a';
import Recursive from './recursive';

@rootDataConnect()
export default class Root extends Component {
  render () {
    return (
      <div>
        <CompA />
        <Recursive depth={4} breadth={11} />
      </div>
    );
  }
}
