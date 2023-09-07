import React from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "./UserContext";

function Entry() {
    const { id } = useParams()
    const { user } = useUserContext()

    const plant = user.plants.find(plant => plant.id === parseInt(id))
    
    return(<div className="flex justify-center bg-[#64705C] w-full h-full p-10 m-9 rounded-lg">
        <h1>Page</h1>
        <h1>{plant.name}</h1>
    </div>)
}

export default Entry