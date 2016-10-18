import { default as React } from 'react';
import { Link } from 'react-router';
import { Utils } from '/imports/services/Utils';
import { I18n } from '/imports/services/I18n';
import { CAuth } from '/imports/ui/components/CAuth';

export const CHeader = React.createClass({

  render() {
    return (
      <header className='header'>
        <Link to="/" className="header__logo">ChatNearby</Link>
        <div className="header__auth">
          <CAuth/>
        </div>
      </header>
    );
  }
});
