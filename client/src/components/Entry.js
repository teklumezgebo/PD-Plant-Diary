import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../UserContext";
import { Line } from "react-chartjs-2";
import { Chart as Chart } from "chart.js/auto"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function Entry() {
    const { id } = useParams()
    const { user } = useUserContext()

    const [duration, setDuration] = useState('')
    const [intensity, setIntensity] = useState('')
    const [frequency, setFrequency] = useState('')
    const [nutrients, setNutrients] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [measurementValue, setMeasurementValue] = useState('')

    const plant = user.plants.find(plant => plant.id === parseInt(id))

    console.log(plant)

    const chartdata = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{
            label: "amount",
            data: [1,2,3,4,5,6,7]
        }]
    }

    const careRequirementsObj = {
        watering_frequency: frequency,
        light_duration: duration,
        light_intensity: intensity,
        nutrients: nutrients
    }

    const newDataObj = {
        measurement_date: selectedDate,
        measurement_value: measurementValue
    }
    
    return(
        <div className="bg-[#64705C] grid grid-cols-1 w-screen h-full p-5">
            <div className="bg-[#FFE8D6] grid grid-flow-cols-2 justify-stretch gap-2 h-screen rounded-xl p-4 shadow-xl">
                <div className="bg-[#DDBEA9] grid grid-cols-2 gap-4 w-full rounded-xl items-start p-4 shadow-md">
                    <div className="bg-[#615C70] flex flex-col-2 gap-3 h-full items-start rounded-xl p-4">
                        <div className="bg-[#F4F3F5] flex flex-col gap-2 rounded-md p-2 w-96">
                            <div className="text-black p-2 font-semibold text-center text-7xl">
                                {plant.name}
                            </div>
                            <div className=" text-black text-left">
                                {plant.species}
                            </div>
                            <div className="  text-black text-left">
                                {plant.plant_ownerships[0].plant_date}
                            </div>
                            <div className=" text-black text-left">
                                Notes:
                            </div>
                            <div className=" text-black text-left">
                                {plant.notes}
                            </div>
                        </div>
                        <div className="bg-[#F4F3F5] flex flex-col w-full h-full rounded-md p-3">
                            <form className="bg-[#3E3B48] rounded-md flex flex-col gap-2 p-3 items-center">
                                <div className="bg-white text-center rounded-xl p-2">Edit Trackers</div>
                                <input className="bg-black p-3" type="text"/>
                                <input className="bg-black" type="text"/>
                                <input className="bg-black" type="text"/>
                                <input className="bg-black" type="text"/>
                            </form>
                        </div>
                    </div>
                    <div className="bg-[#705C61] grid grid-cols-1 place-items-center h-full items-center rounded-xl p-4">
                        <div className="bg-white w-32 p-2 text-center rounded-xl hover:cursor-pointer hover:scale-110 duration-150">Upload Image</div>
                    </div>
                </div>
                <div className="bg-[#DDBEA9] grid grid-cols-2 gap-3 p-4 w-full rounded-xl shadow-md">
                    <div className="bg-[#5C706B] rounded-xl text-center"><Line data={chartdata} /></div>
                    <div className="bg-[#5C706B] rounded-xl text-center"><Line data={chartdata} /></div>
                </div>
            </div> 
        </div>
    )
}

export default Entry