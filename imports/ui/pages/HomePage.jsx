import { default as React } from 'react';
import { default as CMap } from '/imports/ui/components/CMap';
import { Dispatcher } from '/imports/services/Dispatcher';

export const HomePage = React.createClass({

  render() {
    return (
      <div className="home-page" style={{height: '100%'}}>
        <CMap></CMap>
      </div>
    );
  }
});
