import { default as React } from 'react';
import { default as ReactDOM } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Accounts } from 'meteor/accounts-base';
import { Dispatcher } from '/imports/services/Dispatcher';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Accounts.onLogin(function(user){
  Dispatcher.publish('login');
});

Accounts.onLogout(function(){
  Dispatcher.publish('logout');
});

export const CAuth = React.createClass({
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.authContainer));
  },

  componentWillUnmount() {
    Blaze.remove(this.view);
  },

  render() {
    return (
      <span ref="authContainer" />
    );
  }
});
