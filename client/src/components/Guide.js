import React from "react";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../UserContext";

function Guide() {
    const { id } = useParams()
    const { results } = useUserContext()

    const plant = results.data.find(plant => plant.id === parseInt(id))

    return(
        <div className="p-5">
            <div className="bg-[#9A8C98] h-screen grid grid-rows-2 place-items-center p-4 rounded-lg">
                <div className="bg-[#22223B] w-1/2 grid grid-col-2 h-1/2 place-items-center rounded-2xl shadow-md">
                    <div className="rounded-2xl h-2/3 w-2/3 text-center p-2 text-5xl font-bold text-[#F2E9E4]">{plant.common_name},</div>
                    <div className="rounded-2xl h-1/2 w-1/3 text-center p-2 text-md font-bold text-[#F2E9E4]">{plant.scientific_name}</div>
                </div>
                <div className="grid grid-row-3">
                    <div className="grid grid-cols-3 gap-6 p-2">
                        {plant.section.map(section => 
                            <div key={section.id} className="bg-[#F2E9E4] grid grid-cols-1 place-items-center p-4 gap-4 rounded-2xl shadow-lg hover:scale-105 hover:cursor-pointer duration-150 text-center place-content-start">
                                <div className="font-bold uppercase">{section.type}</div>
                                <div className="">{section.description}</div>
                            </div>
                        )}
                    </div>
                </div>
                <Link to="/guides"><div className="bg-[#C9ADA7] w-20 text-center font-semilight text-[#22223B] rounded-3xl p-2 hover:cursor-pointer hover:scale-105 duration-150 shadow-xl">Back to search</div></Link>
            </div>
        </div>
    )
}

export default Guide