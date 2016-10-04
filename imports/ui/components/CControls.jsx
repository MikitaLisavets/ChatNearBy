import { default as React } from 'react';
import { Meteor } from 'meteor/meteor';
import { Dispatcher } from '/imports/services/Dispatcher';

export const CControls = React.createClass({

  handleControl() {
    var title =  prompt('Please set title for chat', '') || '';

    Meteor.call('chats.insert', {
      title: title,
      lat: this.state.lat,
      lng: this.state.lng
    });
    Dispatcher.publish('notification.add', {
      message: 'added',
      level: 'success',
      autoDismiss: 3
    });
  },

  setCoords(lat, lng) {
    this.setState({
      lat: lat,
      lng: lng
    })
  },

  render() {
    if (Meteor.userId()) {
      return (
        <div className="home-controls" onClick={this.handleControl}>
        </div>
      );
    } else {
      return (
        <span />
      );
    }
  }
});
