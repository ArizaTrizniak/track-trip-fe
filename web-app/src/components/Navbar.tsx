import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">TrackTrip</div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
            </div>
        </nav>
    );
};

export default Navbar;
