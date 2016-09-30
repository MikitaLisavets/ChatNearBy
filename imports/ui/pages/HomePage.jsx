import { default as React } from 'react';
import { CMap } from '/imports/ui/components/CMap';

export const HomePage = React.createClass({
  render() {
    return (
      <div className="Home">
        <CMap></CMap>
      </div>
    );
  }
});
