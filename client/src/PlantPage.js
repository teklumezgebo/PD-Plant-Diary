import React, { useState } from "react";
import { useUserContext } from "./UserContext";
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
        plantDate: plantDate,
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
                    const plantObj = {
                        id: plant.id,
                        name: plant.name,
                        species: plant.species,
                        notes: plant.notes
                    }
                    const updatedPlants = [...user.plants, plantObj]
                    user.plants = updatedPlants
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
        <div className="flex justify-center">
            <div className="flex-1 flex items-start mt-10 ml-10">
                <form className="bg-[#DDBEA9] p-4 shadow-md shadow-[#DDBEA9] rounded-lg flex flex-col w-80" onSubmit={handleNewPlant}>
                    <input className="rounded border border-white hover:border-black duration-150 text-sm mb-4 indent-1 w-36 h-9" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name..."/>
                    <input className="rounded border border-white hover:border-black duration-150 text-sm mb-4 indent-1 w-44 h-9" type="text" value={species} onChange={e => setSpecies(e.target.value)} placeholder="Species..."/>
                    <input className="rounded border border-white hover:border-black duration-150 text-sm mb-4 indent-1 w-44 h-9" type="text" value={plantDate} onChange={e => setPlantDate(e.target.value)} placeholder="Day planted..."/>
                    <textarea className="rounded resize-y border border-white hover:border-black duration-150 text-sm indent-1 w-50" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes..." />
                    <input className="rounded border border-[#6B705C] bg-[#6B705C] text-black hover:text-white duration-200 font-semibold mt-4 w-24 text-center cursor-pointer" type="submit" value="Add Plant"/>
                </form>
            </div>
            <div className="flex items-center ml-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 ">
                    {user.plants.map(plant => { return (<PlantCard
                        key={plant.id}
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