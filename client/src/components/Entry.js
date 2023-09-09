import React from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../UserContext";

function Entry() {
    const { id } = useParams()
    const { user } = useUserContext()

    const plant = user.plants.find(plant => plant.id === parseInt(id))
    
    return(
        <div className="grid-rows-1 place-content-center w-full">
            <div className="flex bg-[#64705C] h-screen p-10 m-9 rounded-lg">
                <div className="pb-10 rounded-lg h-40 w-50">
                    <h1 className="p-5 rounded-lg font-extrabold text-[#C3B4C4] text-7xl text-left" >{plant.name}</h1>
                    <h1 className="pl-5 rounded-lg font-extrabold text-[#CC9E80] text-2xl text-left" >{plant.species}</h1>
                    <h1 className="p-5 mt-10 font-semibold text-xl text-[#ffea00]"><em>Notes</em>:</h1>
                    <div className="bg-[#ede4d4] flex rounded-lg ml-3 p-5 w-96 place-content-center ">
                        <h1 className="text-sm text-black text-center">{plant.notes}</h1>
                    </div>
                </div>
                <div className="grid-col-1 w-full h-full ml-20 bg-[#ede4d4] justify-items-center rounded-lg place-content-center p-5">
                    <h1 className="bg-white p-5 h-80 text-center rounded-lg">Care Requirements</h1>
                    <h1 className="bg-white h-96 p-5 mt-10 text-center rounded-lg">Graph</h1> 
                </div> 
            </div>           
        </div>
    )
}

export default Entry