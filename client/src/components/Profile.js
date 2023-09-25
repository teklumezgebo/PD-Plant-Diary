import React, { useState } from "react";
import { useUserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { user, setUser, setResults, setSearchTerm } = useUserContext()
    const [deletionForm, setDeletionForm] = useState(false)
    const navigate = useNavigate()

    function handleAccountDelete() {
        fetch(`/users/${user.id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setSearchTerm(null)
            setResults(null)
            setUser(null)
            navigate('/')
        })
    }
    
    return (
        <div className="bg-[#9A8C98] grid grid-col-1 place-items-center p-10 m-9 rounded-lg shadow-lg w-full h-screen">
            <div className=" rounded-lg">
                <h1 className="p-5 rounded-lg font-extrabold text-[#F2E9E4] text-6xl items-start" >{user.username}</h1>
            </div>
            <div className="bg-[#C9ADA7] w-2/3 grid grid-cols-2 justify-items-center p-4 rounded-2xl shadow-lg">
                <h1 className="font-bold text-[#F2E9E4] text-2xl col-span-2">You've have</h1>
                <br></br>
                <div className="font-bold text-[#4A4E69] text-center col-span-2 text-6xl">{user.plants.length}</div>
                <br></br>
                <div className="font-bold text-[#F2E9E4] text-center col-span-2 text-2xl">current plants</div>
            </div>
            <div className="bg-[#C9ADA7] w-64 grid grid-cols-1 justify-items-center p-4 rounded-2xl shadow-md hover:cursor-pointer hover:scale-105 hover:text-[#F2E9E4] text-[#22223B] duration-150">
                <div className="text-center font-semibold" onClick={() => setDeletionForm(true)}>Delete Account</div>
            </div>
            {deletionForm ? 
                <div onClick={() => setDeletionForm(false)} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-[#F2E9E4] grid grid-col-2 w-1/5 place-items-center h-1/5 rounded-lg p-2">
                        <div className="col-span-2 text-center font-semibold">Are you sure you want to delete your account?</div>
                        <div className="bg-[#9A8C98] p-4 text-center w-20 rounded-xl hover:cursor-pointer hover:scale-105 duration-150 font-semibold" onClick={handleAccountDelete}>Yes</div>
                        <div className="bg-[#22223B] p-4 text-center w-20 rounded-xl text-[#F2E9E4] hover:cursor-pointer hover:scale-105 duration-150 font-semibold" onClick={() => setDeletionForm(false)}>No</div>
                    </div>
                </div> : null}
        </div>
    )
}

export default Profile