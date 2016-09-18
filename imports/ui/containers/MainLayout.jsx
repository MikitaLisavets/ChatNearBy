import { default as React, Component } from 'react';
import { CHeader } from '../components/CHeader';

export class MainLayout extends Component {
  render() {
    return (
      <div className="page">
        <CHeader />
        <main className="page__content">{this.props.children}</main>
      </div>
    );
  }
}