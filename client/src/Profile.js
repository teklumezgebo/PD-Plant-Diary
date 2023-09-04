import React from "react";
import { useUserContext } from "./UserContext";
function Profile() {
    const { user } = useUserContext()
    
    return (
        <div>
            <h1 className="text-center">{user.username}</h1>
        </div>
    )
}

export default Profile