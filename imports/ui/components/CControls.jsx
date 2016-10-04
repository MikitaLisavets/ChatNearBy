import { default as React } from 'react';
import { Meteor } from 'meteor/meteor';

export const CControls = React.createClass({

  handleControl() {

  },

  render() {
    if (Meteor.userId()) {
      return (
        <div className="home-controls" onClick={handleControl}>
        </div>
      );
    } else {
      return (
        <span />
      );
    }
  }
});
