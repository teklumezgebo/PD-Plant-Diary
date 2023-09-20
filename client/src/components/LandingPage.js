import React from "react";
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <div className="flex flex-col bg-[#4A4E69] h-screen justify-top items-center">
                <div className="text-black text-center font-semibold text-9xl mt-5 bg-[#F2E9E4] w-auto rounded-xl p-3 shadow-xl">PD</div>
                <div className="text-black text-center font-thin text-3xl bg-[#F2E9E4] w-auto rounded-lg p-3 mt-10 shadow-xl">The all in one plant tracker.</div>
                <div className="flex flex-row mt-8 gap-5">
                    <Link to="/login"><div className="text-black text-center font-semibold bg-[#9A8C98] hover:scale-105 w-20 p-2 rounded-lg shadow-md  hover:cursor-pointer duration-200">Login</div></Link>
                    <Link to="/signup"><div className="text-black text-center font-semibold bg-[#C9ADA7] hover:scale-105 w-20 p-2 rounded-lg shadow-md  hover:cursor-pointer duration-200">Sign Up</div></Link>
                </div> 
        </div>
    )
}

export default LandingPage