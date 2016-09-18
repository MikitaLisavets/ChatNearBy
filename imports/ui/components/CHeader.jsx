import { default as React, Component } from 'react';
import { Link } from 'react-router';

export class CHeader extends Component {
  render() {
    return (
      <header className='header'>
        <b>Header</b> &nbsp;
        <Link to="/">Home</Link> &nbsp;
        <Link to="about">About Page</Link> &nbsp;
        <Link to="bad-url">Not Found Page</Link> &nbsp;
      </header>
    );
  }
}
