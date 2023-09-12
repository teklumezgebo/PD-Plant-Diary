import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../UserContext";
import { Line } from "react-chartjs-2";
import { Chart as Chart } from "chart.js/auto"
import DatePicker from "react-datepicker"
import { MdWaterDrop, MdOutlineGrass } from "react-icons/md"
import { GiFlashlight } from "react-icons/gi"
import { HiClock } from "react-icons/hi"
import "react-datepicker/dist/react-datepicker.css"

function Entry() {
    const { id } = useParams()
    const { user } = useUserContext()

    const [duration, setDuration] = useState('')
    const [intensity, setIntensity] = useState('')
    const [frequency, setFrequency] = useState('')
    const [location, setLocation] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [measurementValue, setMeasurementValue] = useState('')
    const [image, setImage] = useState('')
    const [form, setForm] = useState(false)

    const plant = user.plants.find(plant => plant.id === parseInt(id))

    const chartdata = {
        labels: plant.care_requirements.measurement_date.map(date => date.substr(0,10)),
        datasets: [{
            label: "amount",
            data: plant.care_requirements.measurement_value.map(value => parseInt(value)),
            backgroundColor: '#9BD0F5'
        }]
    }

    const careRequirementsObj = {
        watering_frequency: frequency,
        light_duration: duration,
        light_intensity: intensity,
        location: location
    }

    const newDataObj = {
        measurement_date: selectedDate,
        measurement_value: measurementValue
    }

    function handleNewData(e) {
        e.preventDefault()
        fetch(`/record_data/${plant.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDataObj)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(updatedPlant => {
                    const updatedDates = updatedPlant.care_requirements.measurement_date
                    const updatedValues = updatedPlant.care_requirements.measurement_value
                    plant.care_requirements.measurement_date = updatedDates
                    plant.care_requirements.measurement_value = updatedValues
                    setMeasurementValue('')
                    setSelectedDate('')
                })
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }
    
    return(
        <div className="grid grid-cols-1 w-screen h-full p-5">
            <div className="bg-[#F2E9E4] grid grid-flow-cols-2 justify-stretch gap-2 h-full rounded-xl p-4 shadow-xl">
                <div className="bg-[#4A4E69] grid grid-cols-2 gap-4 w-full rounded-xl h-full items-start p-4 shadow-md">
                    <div className="bg-[#9A8C98] flex flex-col-2 gap-3 h-full items-start rounded-xl shadow-lg p-4">
                        <div className="bg-[#F2E9E4] flex flex-col gap-2 rounded-md p-2 w-96">
                            <div className="text-black p-2 font-semibold text-center text-7xl">
                                {plant.name}
                            </div>
                            <div className=" text-black text-left">
                                Species: {plant.species}
                            </div>
                            <div className="  text-black text-left">
                                Entered: {plant.plant_ownerships[0].plant_date}
                            </div>
                        </div>
                        <div className="bg-[#4A4E69] flex w-full h-full gap-3 rounded-md p-3">
                            <div className="bg-[#F2E9E4] w-full h-full rounded-md" >
                                <div className="bg-[#F2E9E4] text-gray-500 p-3 rounded-md font-semibold text-left text-sm ">
                                    <div className="text-xl ">Notes:</div>
                                    <div className="h-full">{plant.notes}</div>
                                </div>
                            </div>
                            <form className="bg-[#F2E9E4] rounded-md w-full grid grid-col gap-2 p-3 items-left">
                                <div className="bg-white text-center rounded-xl w-full p-2 hover:cursor-pointer hover:scale-105 duration-150" onClick={() => setForm(!form)}>Edit Trackers</div>
                                <div className="text-left text-gray-500 font-semibold">Watering Frequnecy:</div>
                                <div className="text-left text-gray-500 font-semibold">Light Intensity:</div> 
                                <div className="text-left text-gray-500  font-semibold">Light Duration:</div>
                                <div className="text-left text-gray-500 font-semibold">Location:</div>
                                <div className={`bg-white h-full rounded-md flex items-center justify-start ${form ? 'scale-100' : 'scale-0'} duration-150 p-2`}>
                                    <div className="bg-black flex flex-col items-center rounded-lg h-full p-2">
                                        <div className="flex flex-col gap-2">
                                            <div className="text-white text-sm"><MdWaterDrop /></div>
                                            <input className="bg-red-200" type="text"/>
                                            <div className="text-white text-sm"><GiFlashlight /></div>
                                            <input className="bg-red-200" type="text"/>
                                            <div className="text-white text-sm"><HiClock /></div>
                                            <input className="bg-red-200" type="text"/>
                                            <div className="text-white text-sm"><MdOutlineGrass /></div>
                                            <input className="bg-red-200" type="text"/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="bg-[#C9ADA7] grid grid-cols-1 place-items-center h-full items-center rounded-xl shadow-lg p-4">
                        <div className="grid grid-cols-1 gap-2 place-items-center">
                            <div className="text-lg font-semibold">Upload a picture here!</div>
                            <input className="bg-gray-200 w-60 p-2 text-center rounded-xl hover:cursor-pointer hover:scale-110 duration-150" type="file" onChange={e => setImage(e.target.files[0])}/>
                            <button className="bg-black w-20 p-2 text-white rounded-xl hover:scale-105 duration-150">Upload</button>
                        </div>
                    </div>
                </div>
                <div className="bg-[#4A4E69] grid grid-cols-2 gap-3 p-4 w-full rounded-xl shadow-md items-center">
                    <div className="bg-[#5C706B] rounded-xl h-full text-center">
                        <div className="bg-white rounded-xl shadow-lg">
                            <Line data={chartdata} />
                        </div>
                    </div>
                    <div className="bg-[#F2E9E4] grid grid-cols-1 rounded-xl h-full text-center shadow-lg  p-4">
                        <form className="bg-[#9A8C98] shawdow-lg rounded-2xl p-4 grid grid-cols-2 items-start gap-3" onSubmit={handleNewData}>
                            <input className="rounded-md h-20 text-center text-5xl font-bold shadow-lg my-3" type="text" value={measurementValue} onChange={e => setMeasurementValue(e.target.value)}/>
                            <DatePicker className="rounded-md h-20 w-full text-center text-3xl font-bold shadow-lg my-3" type="text" selected={selectedDate} onChange={date => setSelectedDate(date)} />
                            <br></br>
                            <input className="bg-white col-span-2 w-80 rounded-xl shadow-lg h-11 place-self-center hover:cursor-pointer hover:scale-105 duration-150 font-semibold" type="submit" value="Record Value" />
                        </form>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Entry