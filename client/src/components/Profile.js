import React from "react";
import { useUserContext } from "../UserContext";

function Profile() {
    const { user } = useUserContext()
    
    return (
        <div className="bg-[#64705C] p-10 m-9 rounded-lg w-full h-screen">
            <div className="pb-10 rounded-lg">
                <h1 className="p-5 rounded-lg font-extrabold text-[#C3B4C4] text-6xl" >{user.username}</h1>
            </div>
            <div className="grid grid-cols-2 justify-items-center mt-10">
                <div className="mt-10 py-10 rounded-lg">
                    <div className="flex p-5 rounded-lg ">
                        <h1 className="font-bold text-[#DDBEA9] text-3xl">You've planted</h1>
                    </div>
                </div>
                <div className="mt-10 py-10 rounded-lg">
                    <div className="p-5 rounded-lg ">
                        <h1 className="font-bold text-[#DDBEA9] text-3xl">Your active plants</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile