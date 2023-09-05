import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "./UserContext";
import { BsArrowLeftShort } from "react-icons/bs"
import { MdSpaceDashboard } from "react-icons/md"
import { GiPlantSeed } from "react-icons/gi"
import { CgLogOut } from "react-icons/cg"
import { FaUser } from "react-icons/fa"
import { RiPlantFill } from "react-icons/ri"

function Navbar() {
    const { setUser } = useUserContext()
    const [open, setOpen] = useState(true)

    function handleLogout() {
        fetch('logout' , {
            method: 'DELETE'
        })
        .then(() => setUser(null))
    }
    
    return (
        <div className="flex">
            <div className={`bg-[#A5A58D] h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}>
                <BsArrowLeftShort className={`bg-[#6B705C] text-black text-3xl rounded-full absolute -right-3 top-9 border border-black cursor-pointer ${!open && "rotate-180"}`}  onClick={() => setOpen(!open)}/>
                <div className="inline-flex">
                    <GiPlantSeed className={`text-4xl text-black rounded cursor-pointer block float-left mr-2 duration-500 ${!open && "rotate-[360deg]"}`}/>
                    <h1 className={`text-black  origin-left font-medium text-2xl flex-1 duration-0 ${!open && "hidden"}`}>PD</h1>
                </div>
                <ul className="pt-2">
                    <li className="text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white rounded-md mt-2"><span className="text-2xl block float-left"><MdSpaceDashboard/></span><span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>Dashboard</span></li>
                    <li className="text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white rounded-md mt-2"><span className="text-2xl block float-left"><RiPlantFill/></span><span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>Plants</span></li>
                    <li className="text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white rounded-md mt-2"><span className="text-2xl block float-left"><FaUser/></span><span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>Profile</span></li>
                    <li className="text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white rounded-md mt-2" onClick={handleLogout}><span className="text-2xl block float-left"><CgLogOut/></span><span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>Logout</span></li>
                </ul>
            </div>
        </div>
    )
}

{/* <Link to="/">Home</Link>
<Link to="/profile">Profile</Link>
<Link to="/plants">Your Plants</Link>
<button ><Link to="/">Logout</Link></button> */}

export default Navbar