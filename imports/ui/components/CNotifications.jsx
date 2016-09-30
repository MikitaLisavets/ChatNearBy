import { default as React } from 'react';
import { Meteor } from 'meteor/meteor';
import { default as NotificationSystem } from 'react-notification-system';
import { Dispatcher } from '/imports/services/Dispatcher';

export const CNotifications = React.createClass({

  componentDidMount() {
    Dispatcher.subscribe('notification.add', (notification) => {
      this.refs.notificationSystem.addNotification(notification);
    });
    Dispatcher.subscribe('notification.remove', (notification) => {
      this.refs.notificationSystem.removeNotification(notification);
    });
  },

  render() {
    return (
      <NotificationSystem ref="notificationSystem"/>
    );
  }
});
