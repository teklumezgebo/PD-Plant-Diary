import React from "react";
import { Link } from 'react-router-dom'
import { useUserContext } from "./UserContext";

function Navbar() {
    const { setUser } = useUserContext()

    function handleLogout() {
        fetch('logout' , {
            method: 'DELETE'
        })
        .then(() => setUser(null))
    }
    
    return (
        <nav>
            <Link to="/">Home</Link>
            <br></br>
            <Link to="/profile">Profile</Link>
            <br></br>
            <Link to="/plants">Your Plants</Link>
            <br></br>
            <button onClick={handleLogout}><Link to="/">Logout</Link></button>
        </nav>
    )
}

export default Navbar