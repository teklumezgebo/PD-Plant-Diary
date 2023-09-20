import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../UserContext";
import { Line } from "react-chartjs-2";
import { Chart as Chart } from "chart.js/auto"
import DatePicker from "react-datepicker"
import { MdWaterDrop, MdLocationPin } from "react-icons/md"
import { GiFlashlight } from "react-icons/gi"
import { HiClock } from "react-icons/hi"
import { BsFillTrashFill } from "react-icons/bs"
import "react-datepicker/dist/react-datepicker.css"
import { Link } from "react-router-dom";

function Entry() {
    const { id } = useParams()
    const { user } = useUserContext()

    const [duration, setDuration] = useState('')
    const [intensity, setIntensity] = useState('')
    const [frequency, setFrequency] = useState('')
    const [location, setLocation] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [measurementValue, setMeasurementValue] = useState('')
    const [label, setLabel] = useState('')
    const [form, setForm] = useState(false)
    const [deletionForm, setDeletionForm] = useState(false)

    const plant = user.plants.find(plant => plant.id === parseInt(id))
  
    Chart.defaults.color = "#F2E9E4"

    const chartdata = {
        labels: plant.care_requirements && plant.care_requirements.measurement_date ? plant.care_requirements.measurement_date.map(date => date.substr(0,10)) : [],
        datasets: [{
            label: plant.care_requirements && plant.care_requirements.measurement_label ? plant.care_requirements.measurement_label : "Value",
            data: plant.care_requirements && plant.care_requirements.measurement_value ? plant.care_requirements.measurement_value.map(value => parseInt(value)) : [],
            backgroundColor: '#22223B',
            borderColor: 'white'
        }]
    }

    const careRequirementsObj = {
        location: location,
        watering_frequency: frequency,
        light_duration: duration,
        light_intensity: intensity
    }

    console.log(careRequirementsObj)

    const newDataObj = {
        measurement_date: selectedDate,
        measurement_value: measurementValue,
        label: label
    }

    function handleNewRequirement(e) {
        e.preventDefault()
        fetch(`/record_requirements/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(careRequirementsObj)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(updatedPlant => {
                    console.log(updatedPlant)
                    plant.care_requirements = updatedPlant.care_requirements
                    setFrequency('')
                    setIntensity('')
                    setDuration('')
                    setLocation('')
                    setForm(false)
                })
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }

    function handleTracking() {
        fetch(`/initiate_tracking/${id}}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tracking: true
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(updatedPlant => {
                    plant.care_requirements = updatedPlant.care_requirements
                    
                })
            } else {
                res.json().then(res => console.log(res))
            }
        })
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
                    plant.care_requirements = updatedPlant.care_requirements
                    setMeasurementValue('')
                    setSelectedDate('')
                    setLabel('')
                })
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }

    function handleDeletion() {
        fetch(`/plants/${plant.id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setDeletionForm(false)
        })
    }
    
    return(
        <div className="grid grid-cols-1 w-screen h-full p-5">
            <div className="bg-[#F2E9E4] grid grid-flow-rows gap-2 h-full rounded-xl p-4 shadow-xl">
                <div className="bg-[#4A4E69] grid grid-cols-2 gap-4 w-full rounded-xl h-full items-start p-4 shadow-md">
                    <div className="bg-[#9A8C98] grid grid-col-2 gap-3 h-full items-start rounded-xl shadow-lg p-4">
                        <div className="bg-[#4A4E69] grid grid-col gap-2 rounded-md shadow-lg p-2 w-96">
                            <div className="text-[#F2E9E4] p-2 font-semibold text-center text-7xl">{plant.name}</div>
                            <div className=" text-[#F2E9E4] p-2 text-left font-medium">Species: {plant.species}</div>
                            <div className="text-[#F2E9E4] p-2 text-left font-medium">Entered: {plant.plant_ownerships ? plant.plant_ownerships[0].plant_date : <div>Loading....</div>}</div>
                            <div className="grid grid-col-2 p-2 gap-2">                     
                                <div className="bg-[#9A8C98] shadow-md text-center rounded-xl w-full p-2 hover:cursor-pointer hover:scale-105 duration-150 font-semibold " onClick={() => setForm(true)}>Edit Trackers</div>
                                <div className="bg-[#C9ADA7] w-full h-10 rounded-xl grid grid-col place-items-center hover:cursor-pointer hover:scale-105 duration-150 " onClick={() => setDeletionForm(true)}><BsFillTrashFill/></div>
                            </div>
                        </div>
                        
                        <div className="bg-[#4A4E69] shadow-lg grid grid-col-1 w-full h-full gap-4 rounded-md p-3 items-center">
                            <div className="bg-[#F2E9E4] w-full h-full rounded-md" >
                                <div className="bg-[#F2E9E4] text-[#22223B] p-3 rounded-md font-semibold text-left text-sm ">
                                    <div className="text-xl ">Notes:</div>
                                    <div className="h-full">{plant.notes}</div>
                                </div>
                            </div>
                                <div className="bg-[#F2E9E4] grid grid-cols-4 gap-3 p-2 shadow-lg rounded-md">
                                    <div className="text-left text-[#22223B] font-bold">Watering Frequnecy: {plant.care_requirements ? (plant.care_requirements.watering_frequency ? plant.care_requirements.watering_frequency : "") : ""}</div>
                                    <div className="text-left text-[#22223B] font-bold">Light Intensity: {plant.care_requirements ? (plant.care_requirements.light_intensity ? plant.care_requirements.light_intensity : "" ): ""}</div> 
                                    <div className="text-left text-[#22223B] font-bold">Light Duration: {plant.care_requirements ? (plant.care_requirements.light_duration ? plant.care_requirements.light_duration :  "" ): ""}</div>
                                    <div className="text-left text-[#22223B] font-bold">Location: {plant.care_requirements ? (plant.care_requirements.location ? plant.care_requirements.location : "") : ""}</div>
                                </div>
                                {form ? <div onClick={() => setForm(false)} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                                    <form className="bg-[#F2E9E4] shadow-lg rounded-md  grid grid-col gap-2 p-3 items-left" onSubmit={handleNewRequirement}>
                                        <div className={` h-full w-3/5  rounded-md  grid items-center justify-center ${form ? 'scale-100' : 'scale-0'} w-full duration-150 p-2`}>
                                            <div className="bg-[#4A4E69] shadow-lg grid grid-col items-center rounded-lg h-full w-96 p-2">
                                                <div className="grid grid-col gap-2 p-4">
                                                    <div className="bg-red-200 w-10 h-10 font-bold p-2 text-center rounded-lg place-self-end -mt-2 hover:cursor-pointer hover:scale-105 duration-150" onClick={() => setForm(false)}>X</div>
                                                    <div className="grid grid-col gap-2 items-center" >
                                                    <div className="text-white text-sm"><MdWaterDrop /></div>
                                                    <input className="rounded-md shadow-md p-1" type="text" onChange={e => setFrequency(e.target.value)} value={frequency}/>
                                                    <div className="text-white text-sm"><GiFlashlight /></div>
                                                    <input className="rounded-md shadow-md p-1" type="text" onChange={e => setIntensity(e.target.value)} value={intensity}/>
                                                    <div className="text-white text-sm"><HiClock /></div>
                                                    <input className="rounded-md shadow-md p-1" type="text" onChange={e => setDuration(e.target.value)} value={duration}/>
                                                    <div className="text-white text-sm"><MdLocationPin /></div>
                                                    <input className="rounded-md shadow-md p-1" type="text" onChange={e => setLocation(e.target.value)} value={location}/>
                                                    <input className="bg-[#C9ADA7] rounded-2xl hover:cursor-pointer hover:scale-105 duration-150 shadow-md font-semibold mt-2 h-10" type="submit" value="Change" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div> : null }
                                {deletionForm ? <div onClick={() => setDeletionForm(false)} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                                    <div className="bg-[#F2E9E4] grid grid-col-2 w-1/5 place-items-center h-1/5 rounded-lg p-2">
                                        <div className="col-span-2 text-center">Are you sure you want to delete {plant.name}?</div>
                                        <Link to="/plants"><div className="bg-[#9A8C98] p-4 text-center w-20 rounded-xl hover:cursor-pointer hover:scale-105 duration-150 font-semibold" onClick={handleDeletion}>Yes</div></Link>
                                        <div className="bg-[#22223B] p-4 text-center w-20 rounded-xl text-[#F2E9E4] hover:cursor-pointer hover:scale-105 duration-150 font-semibold" onClick={() => setDeletionForm(false)}>No</div>
                                    </div>
                                </div> : null}
                        </div>
                    </div>
                    <div className="bg-[#C9ADA7] grid grid-cols-1 place-items-center h-full items-center rounded-xl shadow-lg p-4">
                        <div className="grid grid-cols-1 gap-2 place-items-center">
                            <div className="text-lg font-semibold">Upload a picture here!</div>
                            <input className="bg-gray-200 w-60 p-2 text-center rounded-xl hover:cursor-pointer hover:scale-110 duration-150" type="file" />
                            <button className="bg-black w-20 p-2 text-white rounded-xl hover:scale-105 duration-150">Upload</button>
                        </div>
                    </div>
                </div>
                <div className={`bg-[#4A4E69] grid ${plant.care_requirements && plant.care_requirements.tracking ? 'grid-cols-2' : 'grid-cols-1 place-items-center'} gap-3 p-4 w-full rounded-xl shadow-md items-center `}>
                  {plant.care_requirements && plant.care_requirements.tracking ? <div className="bg-[#5C706B] rounded-xl h-full text-center p-2"> 
                        <Line className="text-[#F2E9E4]" data={chartdata} />
                    </div> : <div className="bg-[#F2E9E4] w-1/5 rounded-xl h-20 grid grid-cols-1 text-center font-semibold place-self-center hover:cursor-pointer hover:scale-105 duration-150 content-center text-2xl" onClick={handleTracking}>Add Tracking</div>}
                    {plant.care_requirements && plant.care_requirements.tracking ? <div className="bg-[#F2E9E4] grid grid-cols-1 rounded-xl h-full text-center shadow-lg  p-4">
                        <form className="bg-[#9A8C98] shawdow-lg rounded-2xl p-4 grid grid-cols-2 items-start gap-3" onSubmit={handleNewData}>
                            <input className="rounded-md h-20 text-center text-5xl font-bold shadow-lg my-3" type="text" value={measurementValue} onChange={e => setMeasurementValue(e.target.value)}/>
                            <DatePicker className="rounded-md h-20 w-full text-center text-3xl font-bold shadow-lg my-3" type="text" selected={selectedDate} onChange={date => setSelectedDate(date)} />
                            <br></br>
                            {plant.care_requirements.measurement_label ? null : <div className="col-span-2 w-80 rounded-xl shadow-lg h-11 place-self-center text-center font-semibold"><label className="col-span-2 w-80 rounded-xl shadow-lg h-11 place-self-center text-center font-semibold" htmlFor='label'>Measurment Label</label><input id="label" className="col-span-2 w-80 rounded-xl shadow-lg h-11 place-self-center text-center font-semibold" type="text" value={label} onChange={e => setLabel(e.target.value)}/></div>}
                            <br></br>
                            <input className="bg-white col-span-2 w-80 rounded-xl shadow-lg h-11 place-self-center hover:cursor-pointer hover:scale-105 duration-150 font-semibold" type="submit" value="Record" />
                        </form>
                    </div> : null}
                </div>
            </div> 
        </div>
    )
}

export default Entry