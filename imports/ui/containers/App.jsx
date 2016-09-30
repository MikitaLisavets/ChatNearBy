import { default as React } from 'react';
import { CHeader } from '/imports/ui/components/CHeader';
import { CNotifications } from '/imports/ui/components/CNotifications';
import { CLoader } from '/imports/ui/components/CLoader';
import { Dispatcher } from '/imports/services/Dispatcher';

export const App = React.createClass({
  getInitialState() {
    locale = localStorage.getItem('locale')
    if (!locale) {
      locale = 'en'
      localStorage.setItem('locale', locale);
    }
    return {
      locale: locale
    }
  },

  componentDidMount() {
    Dispatcher.subscribe('locale.changed', (locale) => {
      this.setState({locale: locale});
    });
  },

  render() {
    return (
      <div className="page">
        <CHeader/>
        <CLoader/>
        <CNotifications/>
        <main className="page__content">{this.props.children}</main>
      </div>
    );
  }
});