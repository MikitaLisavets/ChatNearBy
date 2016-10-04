import { default as React } from 'react';
import { CMap } from '/imports/ui/components/CMap';
import { CControls } from '/imports/ui/components/CControls';
import { Dispatcher } from '/imports/services/Dispatcher';

export const HomePage = React.createClass({

  render() {
    return (
      <div className="Home">
        <CMap></CMap>
        <CControls></CControls>
      </div>
    );
  }
});
