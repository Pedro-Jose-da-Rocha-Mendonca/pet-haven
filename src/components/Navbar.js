import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="logo">Pet Haven</Link>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/adopt">Adopt</Link></li>
      <li><Link to="/learn">Learn</Link></li>
      <li><Link to="/help">Help</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  </nav>
);

export default Navbar;
