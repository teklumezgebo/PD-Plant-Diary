import React from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../UserContext";
import { Line } from "react-chartjs-2";
import { Chart as Chart } from "chart.js/auto"

function Entry() {
    const { id } = useParams()
    const { user } = useUserContext()

    const plant = user.plants.find(plant => plant.id === parseInt(id))

    const chartdata = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{
            label: "amount",
            data: [1,2,3,4,5,6,7]
        }]
    }
    
    return(
        <div className="grid-rows-1 place-content-center w-full">
            <div className="flex bg-[#64705C] h-screen p-10 m-9 rounded-lg">
                <div className="pb-10 rounded-lg h-40 ">
                    <h1 className="p-5 rounded-lg font-extrabold text-[#CC9E80] text-7xl text-left" >{plant.name}</h1>
                    <h1 className="pl-5 rounded-lg font-extrabold text-[#C3B4C4] text-2xl text-left" >{plant.species}</h1>
                    <h1 className="p-5 mt-10 font-semibold text-xl text-[#ffea00]"><em>Notes</em>:</h1>
                    <div className="bg-[#ede4d4] flex rounded-lg ml-3 p-5 w-96 place-content-center ">
                        <h1 className="text-sm text-black text-center">{plant.notes}</h1>
                    </div>
                </div>
                <div className="grid-col-1 w-full h-full ml-20 bg-[#FFE8D6] rounded-lg p-5">
                    <div className="bg-[#D6E0FF] p-5 h-80 text-black text-left text-3xl font-extrabold rounded-lg w-full">
                        <h1>Care Requirements</h1>
                        <h1>Light intensity, light duration (lumens/lux)</h1>
                        <h1>Watering Frequency</h1>
                        <h1>Nutrients - what kinds, how much of each, when/how long</h1>
                    </div>
                    <div className="flex bg-[#D6E0FF] h-96 p-5 mt-10 rounded-lg w-full justify-center">
                        <Line data={chartdata} />   
                    </div> 
                </div> 
            </div>           
        </div>
    )
}

export default Entry