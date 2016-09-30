import { Meteor } from 'meteor/meteor';
import { default as React } from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { default as ReactDOM } from 'react-dom';
import { createHistory, useBasename } from 'history';

import { App } from '/imports/ui/containers/App';
import { HomePage } from '/imports/ui/pages/HomePage';
import { ChatPage } from '/imports/ui/pages/ChatPage';
import { SettingsPage } from '/imports/ui/pages/SettingsPage';

Meteor.startup(() => {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={HomePage}/>
        <Route path="/chat/:id" component={ChatPage}/>
        <Route path="/settings" component={SettingsPage}/>
        <Redirect from="/*" to="/"/>
      </Route>
    </Router>,
    document.getElementById('app')
  );
});
