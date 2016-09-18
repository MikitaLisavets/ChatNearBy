import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { createHistory, useBasename } from 'history';

import { MainLayout } from '../imports/ui/containers/MainLayout';
import { About } from '../imports/ui/pages/About';
import { Home } from '../imports/ui/pages/Home';
import { NotFound } from '../imports/ui/pages/NotFound';

Meteor.startup(() => {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route component={MainLayout}>
        <Route path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>,
    document.getElementById('app')
  );
});
