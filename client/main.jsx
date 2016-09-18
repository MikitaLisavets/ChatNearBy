import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { createHistory, useBasename } from 'history';

import { routes } from '../imports/router/routes';
import { MainLayout } from '../imports/ui/containers/MainLayout';

const rootRoute = {
  component: MainLayout,
  childRoutes: routes,
};

Meteor.startup(() => {
  ReactDOM.render(
    <Router history={browserHistory} routes={rootRoute} />,
    document.getElementById('app')
  );
});