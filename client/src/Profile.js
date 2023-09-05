import React from "react";
import { useUserContext } from "./UserContext";

function Profile() {
    const { user } = useUserContext()
    
    return (
        <div className="inline-flex justify-start">
            <span className="align-top">{user.username}</span>
        </div>
    )
}

export default Profile