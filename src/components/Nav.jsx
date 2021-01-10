import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav>
    <ul>
      <li><Link to="/home">Dashboard</Link></li>
      <li><Link to="/logout">Logout</Link></li>
    </ul>
  </nav>
);

export default Nav;
