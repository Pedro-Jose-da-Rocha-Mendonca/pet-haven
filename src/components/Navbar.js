import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">My Logo</div>
    <ul>
      <li><Link to="/adopt">Adopt</Link></li>
      <li><Link to="/learn">Learn</Link></li>
      <li><Link to="/help">Help</Link></li>
    </ul>
  </nav>
);

export default Navbar;
