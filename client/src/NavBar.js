import React from "react";
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="justify-content">
            <Link to="/">Home</Link>
            <br></br>
            <Link to="/profile">Profile</Link>
            <br></br>
            <Link to="/plants">Your Plants</Link>
        </nav>
    )
}

export default Navbar