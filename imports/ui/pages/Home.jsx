import { default as React, Component } from 'react';
import { default as classNames } from 'classnames';
import { CMap } from '../components/CMap';

export class Home extends Component {
  render() {
    return (
      <div className="Home">
        <CMap></CMap>
      </div>
    );
  }
}
