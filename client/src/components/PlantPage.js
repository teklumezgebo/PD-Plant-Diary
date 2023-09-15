import React, { useState } from "react";
import { useUserContext } from "../UserContext";
import PlantCard from "./PlantCard";

function PlantPage() {
    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [plantDate, setPlantDate] = useState('')
    const [notes, setNotes] = useState('')

    const { user } = useUserContext()

    const newPlantObj = {
        name: name,
        species: species,
        plant_date: plantDate,
        notes: notes
    }

    function handleNewPlant(e) {
        e.preventDefault()
        fetch('/plants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPlantObj)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(plant => { 
                    user.plants = [...user.plants, {
                        id: plant.id,
                        name: plant.name,
                        species: plant.species,
                        notes: plant.notes
                    }]
                    setName('')
                    setSpecies('')
                    setPlantDate('')
                    setNotes('')
                })
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }

    return (
        <div className="grid grid-cols-1 justify-center bg-[#F2E9E4] w-full h-full p-10 m-9 rounded-lg">
            <div className="grid grid-cols-2">
                <form className="bg-[#22223B] p-4 shadow-md shadow-black rounded-lg flex flex-col w-80" onSubmit={handleNewPlant}>
                    <input className="rounded border border-white hover:border-black duration-150 text-sm mb-4 indent-1 w-36 h-9" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name..."/>
                    <input className="rounded border border-white hover:border-black duration-150 text-sm mb-4 indent-1 w-44 h-9" type="text" value={species} onChange={e => setSpecies(e.target.value)} placeholder="Species..."/>
                    <input className="rounded border border-white hover:border-black duration-150 text-sm mb-4 indent-1 w-44 h-9" type="text" value={plantDate} onChange={e => setPlantDate(e.target.value)} placeholder="Day potted/planted..."/>
                    <textarea className="rounded resize-y border border-white hover:border-black duration-150 text-sm  p-2 w-50" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes..." />
                    <input className="rounded border border-[#9A8C98] bg-[#9A8C98] text-black hover:text-white duration-200 font-semibold mt-4 w-24 text-center cursor-pointer" type="submit" value="Add Plant"/>
                </form>
            </div>
            <br></br>
            <div className="bg-[#4A4E69] h-full w-full grid grid-cols-1 p-4 rounded-xl items-center shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center p-4">
                    {user.plants.map(plant => { return (<PlantCard
                        key={plant.id}
                        id={plant.id}
                        name={plant.name}
                        species={plant.species}
                        notes={plant.notes}
                     />) })}
                </div>
            </div>
        </div>
    )
}

export default PlantPage