import { default as React } from 'react';

export const SettingsPage = React.createClass({

  getInitialState() {
    return {
      val: 0
    }
  },

  method() {
    this.setState({
      val: this.state.val + 1
    })
  },

  render() {
    return (
      <div className='settings' onClick={this.method}>
        <h1>This page can not be found {this.state.val}</h1>
      </div>
    );
  }
});