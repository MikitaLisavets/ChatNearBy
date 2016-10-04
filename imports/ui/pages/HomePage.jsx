import { default as React } from 'react';
import { default as CMap } from '/imports/ui/components/CMap';
import { Dispatcher } from '/imports/services/Dispatcher';

export const HomePage = React.createClass({

  render() {
    return (
      <div className="Home">
        <CMap></CMap>
      </div>
    );
  }
});
