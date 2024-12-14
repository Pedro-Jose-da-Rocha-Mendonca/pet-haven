import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../services/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, signOut } = useAuth();
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Pet Haven</Link>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/adopt">Adopt</Link></li>
        <li><Link to="/learn">Learn</Link></li>
        <li><Link to="/help">Help</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {currentUser ? (
          <>
            <li className="profile-menu">
              <Link to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <button className="sign-out-btn" onClick={signOut}>
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/profile">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
