import { default as React } from 'react';
import { default as classnames } from 'classnames';
import { Dispatcher } from '/imports/services/Dispatcher';

export const CLoader = React.createClass({

  getInitialState() {
    return {
      isLoadedHide: true
    }
  },

  componentWillMount() {
    Dispatcher.subscribe('loader.show', () => {
      this.setState({isLoadedHide: false});
    });
    Dispatcher.subscribe('loader.hide', () => {
      this.setState({isLoadedHide: true});
    });
  },

  render() {
    var classes = classnames({
      'loader': true,
      'loader_hide': this.state.isLoadedHide
    });
    return (
      <div className={classes}></div>
    );
  }
});
