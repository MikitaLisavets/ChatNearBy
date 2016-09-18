import React from 'react';
import { Header } from '../components/Header.jsx';

export class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <main>{this.props.children}</main>
      </div>
    );
  }
}