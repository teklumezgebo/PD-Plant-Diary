import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../UserContext";
import { BsArrowLeftShort } from "react-icons/bs"
import { MdSpaceDashboard } from "react-icons/md"
import { GiPlantSeed } from "react-icons/gi"
import { CgLogOut } from "react-icons/cg"
import { FaUser } from "react-icons/fa"
import { RiPlantFill } from "react-icons/ri"
import { TfiSearch } from "react-icons/tfi"

function Navbar() {
    const { setUser } = useUserContext()
    const [open, setOpen] = useState(false)

    function handleLogout() {
        fetch('logout' , {
            method: 'DELETE'
        })
        .then(() => setUser(null))
    }
    
    return (
        <div className="flex">
            <div className={`bg-[#22223B] h-full p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative left-0 rounded-r-lg`}>
                <BsArrowLeftShort className={`bg-[#22223B] text-[#F2E9E4] text-3xl rounded-full absolute -right-3 top-9 border border-black cursor-pointer ${!open && "rotate-180"}`}  onClick={() => setOpen(!open)}/>
                <div className="inline-flex">
                    <Link to="/"><GiPlantSeed className={`text-4xl text-[#F2E9E4] rounded hover:text-[#9A8C98] cursor-pointer block float-left mr-2 duration-200 ${!open && "rotate-[360deg]"}`}/></Link>
                    <h1 className={`text-[#F2E9E4] origin-left font-bold text-2xl flex-1 duration-0 ${!open && "hidden"} `}>PD</h1>
                </div>
                <ul className="pt-2">
                    <Link to="/dashboard"><li className="text-[#F2E9E4] text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#9A8C98] rounded-md mt-2"><span className="text-2xl block float-left"><TfiSearch /></span><span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>Dashboard</span></li></Link>
                    <Link to="/plants"><li className="text-[#F2E9E4] text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#9A8C98] rounded-md mt-2"><span className="text-2xl block float-left"><RiPlantFill/></span><span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>Plants</span></li></Link>
                    <Link to="/profile"><li className="text-[#F2E9E4] text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#9A8C98] rounded-md mt-2"><span className="text-2xl block float-left"><FaUser/></span><span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>Profile</span></li></Link>
                    <li className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#3A3A22] rounded-md mt-2" onClick={handleLogout}><span className="text-2xl block float-left"><CgLogOut/></span><span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>Logout</span></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar