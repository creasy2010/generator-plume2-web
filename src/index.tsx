import React, { Component } from 'react';
import { render } from 'react-dom';
import { createHashHistory } from 'history';
import { Route, Router } from 'react-router';
import Home from './apps/home';
import DemoList from './apps/demo-list';
const history = createHashHistory();

export default class APP extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" component={Home} />
          <Route path="/demo-list" component={DemoList} />
        </div>
      </Router>
    );
  }
}

render(<APP />, document.getElementById('react-content'));
