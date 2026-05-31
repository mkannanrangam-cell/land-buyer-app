import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/app.css';

const Header = () => (
  <header className="header">
    <div className="logo">🏡 Land Buyer App</div>
    <nav className="nav-links">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/buyer-form">Add Buyer</Link>
    </nav>
  </header>
);

export default Header;
