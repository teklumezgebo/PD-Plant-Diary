import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../UserContext";
import { Line } from "react-chartjs-2";
import { Chart as Chart } from "chart.js/auto"
import DatePicker from "react-datepicker"
import { BsFillTrashFill } from "react-icons/bs"
import "react-datepicker/dist/react-datepicker.css"
import { Link } from "react-router-dom";

function Entry() {
    const { id } = useParams()
    const { user, setUser } = useUserContext()

    const plant = user.plants.find(plant => plant.id === parseInt(id))

    const [duration, setDuration] = useState('')
    const [intensity, setIntensity] = useState('')
    const [frequency, setFrequency] = useState('')
    const [location, setLocation] = useState('')
    const [notes, setNotes] = useState('')
    const [tracking, setTracking] = useState(false)
    const [image, setImage] = useState(plant.image_url ? plant.image_url.replace("http;//", "") : false)
    const [changeImageForm, setChangeImageForm] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [measurementValue, setMeasurementValue] = useState('')
    const [label, setLabel] = useState('')
    const [form, setForm] = useState(false)
    const [deletionForm, setDeletionForm] = useState(false)
    const [trackingForm, setTrackingForm] = useState(false)
    const [trackingType, setTrackingType] = useState('')
    const [error, setErrors] = useState(false)

    Chart.defaults.color = "#F2E9E4"

    const chartdata = {
        labels: plant.care_requirements && plant.care_requirements.measurement_date ? plant.care_requirements.measurement_date.map(date => date.substr(0,10)) : [],
        datasets: [{
            label: plant.care_requirements && plant.care_requirements.measurement_label ? plant.care_requirements.measurement_label : "Value",
            data: plant.care_requirements && plant.care_requirements.measurement_value ? plant.care_requirements.measurement_value : [],
            backgroundColor: '#22223B',
            borderColor: 'white'
        }]
    }

    const careRequirementsObj = {
        location: location,
        watering_frequency: frequency,
        light_duration: duration,
        light_intensity: intensity,
        notes: notes
    }

    const newDataObj = {
        measurement_date: selectedDate,
        measurement_value: parseInt(measurementValue)
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
                    plant.care_requirements = updatedPlant.care_requirement
                    plant.notes = updatedPlant.plant.notes
                    setFrequency('')
                    setIntensity('')
                    setDuration('')
                    setLocation('')
                    setNotes('')
                    setForm(false)
                })
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }

    function handleTracking(e) {
        e.preventDefault()
        fetch(`/initiate_tracking/${id}}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tracking: true,
                label: label
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then((updatedPlant) => {
                    plant.care_requirements = updatedPlant.care_requirement
                    setTracking(true)
                    setTrackingForm(false)
                })
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }

    function handleNewData(e) {
        e.preventDefault()
        fetch(`/record_data/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDataObj)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(updatedPlant => {
                    plant.care_requirements = updatedPlant.care_requirements
                    setMeasurementValue('')
                    setSelectedDate(new Date())
                    setLabel('')
                })
            } else {
                res.json().then(res => setErrors(res))
            }
        })
    }

    function handleImage(e) {
        e.preventDefault()
        const data = new FormData()
        data.append("image", e.target.image.files[0])
        fetch(`/plants/${id}`, {
            method: "PATCH",
            body: data
        })
        .then(res => {
            if (res.ok) {
                res.json().then(res => {
                    plant.image_url = res.image_url
                    setChangeImageForm(false)
                    setImage(res.image_url.replace("http;//", ""))
                })
            } else {
                res.json(res => console.log(res))
            }
        })
    }

    function handleDeletion() {
        fetch(`/plants/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setUser({...user, plants: user.plants.filter(plant => plant.id !== parseInt(id)) })
            setDeletionForm(false)
        })
    }

    function handleCareRequirementsForm() {
        setForm(true)
        setFrequency(plant.care_requirements.watering_frequency ? plant.care_requirements.watering_frequency : '')
        setIntensity(plant.care_requirements.light_intensity ? plant.care_requirements.light_intensity : '')
        setDuration(plant.care_requirements.light_duration ? plant.care_requirements.light_duration : '')
        setLocation(plant.care_requirements.location ? plant.care_requirements.location : '')
        setNotes(plant.notes ? plant.notes : '')
    }

    function handleTrackingType() {
        switch(trackingType) {
            case "Weight":
                return <select onChange={(e) => setLabel(e.target.value)} className="col-span-2 p-2 rounded-xl">
                <option></option>
                <option value="ounces">Ounces</option>
                <option value="grams">Grams</option>
                <option value="pounds">Pounds</option>
                <option value="kilograms">Kilograms</option>
            </select>
            case "Length": 
                return <select onChange={(e) => setLabel(e.target.value)} className="col-span-2 p-2 rounded-xl">
                <option></option>
                <option value="inches">Inches</option>
                <option value="feet">Feet</option>
                <option value="centimeters">Centimeters</option>
                <option value="meters">Meters</option>
            </select>
            default :
            return null
        }
    }
    
    return(
        <div className={`grid grid-cols-1 w-screen ${(plant.care_requirements && plant.care_requirements.tracking) || tracking ? 'h-:full' : 'h-screen' } p-5`}>
            <div className="bg-[#F2E9E4] grid grid-flow-rows gap-2 h-full rounded-lg p-4 shadow-xl">
                <div className="bg-[#4A4E69] grid grid-cols-2 gap-4 w-full rounded-lg h-full items-start p-4 shadow-md">
                    <div className="bg-[#9A8C98] grid grid-col-2 gap-3 h-full items-start rounded-xl shadow-lg p-4">
                        <div className="bg-[#4A4E69] grid grid-col gap-2 rounded-md shadow-lg p-2 w-96">
                            <div className="text-[#F2E9E4] p-2 font-semibold text-center text-7xl w-10">{plant.name}</div>
                            <div className=" text-[#F2E9E4] p-2 text-left font-medium">Species: {plant.species}</div>
                            <div className="text-[#F2E9E4] p-2 text-left font-medium">Entered: {plant.plant_ownerships ? plant.plant_ownerships[0].plant_date : <div>Loading....</div>}</div>
                            <div className="grid grid-col-2 p-2 gap-2">                     
                                <div className="bg-[#9A8C98] shadow-md text-center rounded-xl w-full p-2 hover:cursor-pointer hover:scale-105 duration-150 font-semibold " onClick={handleCareRequirementsForm}>Edit Care Requirements</div>
                                <div className="bg-[#C9ADA7] w-full h-10 rounded-xl grid grid-col place-items-center hover:cursor-pointer hover:scale-105 duration-150 " onClick={() => setDeletionForm(true)}><BsFillTrashFill/></div>
                            </div>
                        </div>
                        
                        <div className="bg-[#4A4E69] shadow-lg grid grid-col-1 w-full h-full gap-4 rounded-md p-3 items-center">
                            <div className="bg-[#F2E9E4] w-full h-full rounded-md" >
                                <div className="bg-[#F2E9E4] text-[#22223B] p-3 rounded-md font-semibold text-left text-sm ">
                                    <div className="text-xl ">Notes:</div>
                                    <div className="h-full text-[#4A4E69]">{plant.notes}</div>
                                </div>
                            </div>
                                <div className="bg-[#F2E9E4] grid grid-cols-4 gap-3 p-2 shadow-lg rounded-md">
                                    <div className="text-left text-[#22223B] font-bold">Watering Frequency:</div>
                                    <div className="text-center text-[#4A4E69] font-semibold">{plant.care_requirements ? (plant.care_requirements.watering_frequency ? plant.care_requirements.watering_frequency : "") : ""}</div>
                                    <div className="text-left text-[#22223B] font-bold">Light Source:</div>
                                    <div className="text-center text-[#4A4E69] font-semibold">{plant.care_requirements ? (plant.care_requirements.light_intensity ? plant.care_requirements.light_intensity : "" ): ""}</div> 
                                    <div className="text-left text-[#22223B] font-bold">Light Duration:</div>
                                    <div className="text-center text-[#4A4E69] font-semibold">{plant.care_requirements ? (plant.care_requirements.light_duration ? plant.care_requirements.light_duration :  "" ): ""}</div>
                                    <div className="text-left text-[#22223B] font-bold">Location:</div>
                                    <div className="text-center text-[#4A4E69] font-semibold">{plant.care_requirements ? (plant.care_requirements.location ? plant.care_requirements.location : "") : ""}</div>
                                </div>
                                {form ? <div  className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                                    <form className="bg-[#F2E9E4] shadow-lg rounded-md  grid grid-col gap-2 p-3 items-left" onSubmit={handleNewRequirement}>
                                        <div className={` h-full w-3/5  rounded-md  grid items-center justify-center ${form ? 'scale-100' : 'scale-0'} w-full duration-150 p-2`}>
                                            <div className="bg-[#4A4E69] shadow-lg grid grid-col items-center rounded-lg h-full w-96 p-2">
                                                <div className="grid grid-col gap-2 p-4">
                                                    <div className="bg-red-200 w-10 h-10 font-bold p-2 text-center rounded-lg place-self-end -mt-2 hover:cursor-pointer hover:scale-105 duration-150" onClick={() => setForm(false)}>X</div>
                                                    <div className="grid grid-col gap-2 items-center" >
                                                    <div className="text-[#F2E9E4] text-sm font-semibold">Watering Frequency:</div>
                                                    <input className="rounded-md shadow-md p-1" type="text" onChange={e => setFrequency(e.target.value)} value={frequency}/>
                                                    <div className="text-[#F2E9E4] text-sm font-semibold">Light Source:</div>
                                                    <input className="rounded-md shadow-md p-1" type="text" onChange={e => setIntensity(e.target.value)} value={intensity}/>
                                                    <div className="text-[#F2E9E4] text-sm font-semibold">Duration In Light Source:</div>
                                                    <input className="rounded-md shadow-md p-1" type="text" onChange={e => setDuration(e.target.value)} value={duration}/>
                                                    <div className="text-[#F2E9E4] text-sm font-semibold">Location:</div>
                                                    <input className="rounded-md shadow-md p-1" type="text" onChange={e => setLocation(e.target.value)} value={location}/>
                                                    <div className="text-[#F2E9E4] text-sm font-semibold">Notes:</div>
                                                    <textarea className="rounded-md shadow-md h-40 align-text-top p-2" type="text" onChange={e => setNotes(e.target.value)} value={notes}/>
                                                    <input className="bg-[#C9ADA7] rounded-2xl hover:cursor-pointer hover:scale-105 duration-150 shadow-md font-semibold mt-2 h-10" type="submit" value="Change" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div> : null }
                                {deletionForm ? <div onClick={() => setDeletionForm(false)} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                                    <div className="bg-[#F2E9E4] grid grid-col-2 w-1/5 place-items-center h-1/5 rounded-lg p-2">
                                        <div className="col-span-2 text-center font-semibold">Are you sure you want to delete {plant.name}?</div>
                                        <Link to="/plants"><div className="bg-[#9A8C98] p-4 text-center w-20 rounded-xl hover:cursor-pointer hover:scale-105 duration-150 font-semibold" onClick={handleDeletion}>Yes</div></Link>
                                        <div className="bg-[#22223B] p-4 text-center w-20 rounded-xl text-[#F2E9E4] hover:cursor-pointer hover:scale-105 duration-150 font-semibold" onClick={() => setDeletionForm(false)}>No</div>
                                    </div>
                                </div> : null}
                        </div>
                    </div>
                    <div className="bg-[#C9ADA7] grid grid-cols-1 place-items-center h-full items-center rounded-xl shadow-lg p-4">
                        <div>
                            {image ? 
                            <div className="grid grid-cols-1 place-items-center gap-3">
                                <img className="h-96 w-96 rounded-xl bg-[#22223B] p-5" src={image}></img>
                                <div className="bg-[#22223B] text-[#F2E9E4] text-center p-2 rounded-lg hover:scale-105 hover:cursor-pointer duration-150" onClick={() => setChangeImageForm(!changeImageForm)}>{changeImageForm ? 'Nevermind' : 'Change?'}</div>
                                {changeImageForm ? <form className="grid grid-cols-1 place-items-center gap-4" onSubmit={e => handleImage(e)}>
                                    <input className="bg-gray-200 w-60 p-2 text-center rounded-xl hover:cursor-pointer hover:scale-110 duration-150" type="file" name="image" />
                                    <input className="bg-[#22223B] text-[#F2E9E4] text-center p-2 rounded-lg hover:scale-105 hover:cursor-pointer duration-150" type="submit" value="Change Picture"/>
                                </form> : null}
                            </div> 
                            : 
                            <form className="grid grid-cols-1 gap-2 place-items-center" onSubmit={e => handleImage(e)}>
                                <div className="text-lg font-semibold">Upload a picture here!</div>
                                <input className="bg-gray-200 w-60 p-2 text-center rounded-xl hover:cursor-pointer hover:scale-110 duration-150" type="file" name="image" />
                                <input className="bg-black w-20 p-2 text-white rounded-xl hover:cursor-pointer hover:scale-105 duration-150" type="submit" value="Upload"/>
                            </form>
                            }
                        </div>
                    </div>
                </div>
                <div className={`bg-[#4A4E69] grid ${(plant.care_requirements && plant.care_requirements.tracking) || tracking === true ? 'grid-cols-2' : 'grid-cols-1 place-items-center'} gap-3 p-4 w-full rounded-xl shadow-md items-center `}>
                  {(plant.care_requirements && plant.care_requirements.tracking) || tracking === true ? <div className="bg-[#5C706B] rounded-xl h-96 text-center p-2"> 
                        <Line className="text-[#F2E9E4]" data={chartdata} />
                    </div> : <div className="bg-[#F2E9E4] w-1/5 rounded-xl h-20 grid grid-cols-1 text-center font-semibold place-self-center hover:cursor-pointer hover:scale-105 duration-150 content-center text-2xl" onClick={() => setTrackingForm(true)}>Add Plant Growth Tracking</div>}
                    {trackingForm ? 
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                        <div className="bg-[#F2E9E4] grid grid-col-1 w-72 place-items-center h-2/5 rounded-lg gap-14">
                            <div className="bg-red-200 w-10 h-10 font-bold p-2 text-center self-start rounded-lg place-self-end relative right-3 top-3 hover:cursor-pointer hover:scale-105 duration-150" onClick={() => setTrackingForm(false)}>X</div>
                            <form className="grid grid-col-2 gap-5 place-items-center self-start -mt-24" onSubmit={handleTracking}>
                                <div className="col-span-2 text-center font-semibold ">What are you measuring?</div>
                                <select className="col-span-2 p-2 rounded-xl" onChange={(e) => setTrackingType(e.target.value)}>
                                    <option></option>
                                    <option value="Length">Length</option>
                                    <option  value="Weight">Weight</option>
                                </select>
                                {handleTrackingType()}
                                {trackingType === ''  ? null : <input type="submit" className="bg-[#22223B] text-[#F2E9E4] p-3 hover:cursor-pointer rounded-xl hover:scale-105 duration-150 col-span-2"/>}
                            </form>
                        </div>
                    </div> 
                    : null}
                    {(plant.care_requirements && plant.care_requirements.tracking) || tracking === true ? <div className="bg-[#F2E9E4] grid grid-cols-1 rounded-xl h-96 text-center shadow-lg  p-4">
                        <form className="bg-[#9A8C98] shawdow-lg rounded-2xl p-4 grid grid-cols-2 items-start gap-3" onSubmit={handleNewData}>
                            <input className="rounded-md h-20 text-center text-5xl font-bold shadow-lg my-3" type="text" placeholder={plant.care_requirements && plant.care_requirements.measurement_label ? plant.care_requirements.measurement_label : "Loading..."} value={measurementValue} onChange={e => setMeasurementValue(e.target.value)}/>
                            <DatePicker className="rounded-md h-20 w-full text-center text-3xl font-bold shadow-lg my-3" type="text" selected={selectedDate} onChange={date => setSelectedDate(date)} />
                            <br></br>
                            <input className="bg-white col-span-2 w-80 rounded-xl shadow-lg h-11 place-self-center hover:cursor-pointer hover:scale-105 duration-150 font-semibold" type="submit" value="Record" />
                        </form>
                    </div> : null}
                    {error ? 
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                        <div className="bg-[#F2E9E4] grid grid-col-1 w-1/5 place-items-center h-1/5 rounded-lg p-2">
                            <div className="col-span-2 text-center font-semibold">{error.error}</div>
                            <div className="bg-[#22223B] p-4 text-center w-20 rounded-xl text-[#F2E9E4] hover:cursor-pointer hover:scale-105 duration-150 font-semibold col-span-2" onClick={() => setErrors(false)}>Okay</div>
                        </div>
                    </div>
                    : 
                    null
                    }
                </div>
            </div> 
        </div>
    )
}

export default Entry