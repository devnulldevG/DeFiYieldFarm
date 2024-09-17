import React from 'react';
import { Link } from 'react-router-dom';
const appName = process.env.REACT_APP_APP_NAME;
const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">{appName}</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/farms">Farms</Link></li>
          <li><Link to="/pools">Pools</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;