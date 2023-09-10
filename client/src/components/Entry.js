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
        <div className="grid-rows-1 place-content-center w-full">
            <div className="flex bg-[#64705C] h-screen p-10 m-9 rounded-lg">
                <div className="pb-10 rounded-lg h-40 ">
                    <h1 className="p-5 rounded-lg font-extrabold text-[#CC9E80] text-7xl text-left" >{plant.name}</h1>
                    <h1 className="pl-5 rounded-lg font-extrabold text-[#C3B4C4] text-2xl text-left" >{plant.species}</h1>
                    <h1 className="pl-5 rounded-lg font-extrabold text-[#C3B4C4] text-2xl text-left" >Entered: {plant.plant_ownerships[0].plant_date}</h1>
                    <h1 className="p-5 mt-10 font-semibold text-xl text-[#ffea00]"><em>Notes</em>:</h1>
                    <div className="bg-[#ede4d4] flex rounded-lg ml-3 p-5 w-96 place-content-center ">
                        <h1 className="text-sm text-black text-center">{plant.notes}</h1>
                    </div>
                </div>
                <div className="grid-col-1 w-full h-full ml-20 bg-[#FFE8D6] rounded-lg p-5">
                    <div className="bg-[#D6E0FF] p-5 mt-5 h-80 text-black text-left text-3xl font-extrabold rounded-lg w-full">
                        <h1 className="text-5xl">Care Requirements</h1>
                        <h1 className="mt-5">Light Duration: placeholder</h1>
                        <h1 className="mt-3">Light intensity: placeholder</h1>
                        <h1 className="mt-3">Watering Frequency: placeholder</h1>
                        <h1 className="mt-3">Nutrients: placeholder</h1>
                    </div>
                    <div className="bg-[#D6E0FF] h-96 p-5 mt-14 rounded-lg w-full">
                        <div className="bg-[#FFF5D6] ml-4 w-64 rounded-lg">
                            <form className="h-84 mt-1">
                                <h1 className="ml-4 -mb-4">Height/Weight</h1>
                                <input className="bg-white m-4 rounded-md p-2 mt-6" type="text"/>
                                <h1 className="ml-4 mb-2">Date</h1>
                                <DatePicker className="bg-white ml-4 rounded-md p-2" selected={selectedDate} onChange={(date) => setSelectedDate(date)}/>
                                <input className="bg-white mt-24 ml-4 mb-3 rounded-md p-3 hover:scale-105 duration-200 cursor-pointer" type="submit" value="Record" />
                            </form>
                        </div>
                        <Line className="bg-[#FFF5D6] rounded-lg p-5 ml-96 -mt-80" data={chartdata} />   
                    </div> 
                </div> 
            </div>           
        </div>
    )
}

export default Entry