import React, { useState } from "react";
import PlantCard from "./PlantCard";

function PlantPage() {
    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [notes, setNotes] = useState('')

    const newPlantObj = {
        name: name,
        species: species,
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
                    console.log(plant)
                    setName('')
                    setSpecies('')
                    setNotes('')
                })
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }

    return (
        <div className="flex justify-center">
            <div className="flex-1 flex items-start mt-11 ml-10">
                <form className="bg-[#DDBEA9] p-4 shadow-md shadow-[#DDBEA9] rounded-lg flex flex-col w-80" onSubmit={handleNewPlant}>
                    <input className="rounded border border-white hover:border-black duration-150 text-sm mb-4 indent-1 w-36 h-9" type="text" value={name} onChange={e => setName(e.target.value)} />
                    <input className="rounded border border-white hover:border-black duration-150 text-sm mb-4 indent-1 w-44 h-9" type="text" value={species} onChange={e => setSpecies(e.target.value)} />
                    <textarea className="rounded resize-y border border-white hover:border-black duration-150 text-sm indent-1 w-50" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes..." />
                    <input className="rounded border border-[#6B705C] bg-[#6B705C] text-black hover:text-white duration-200 font-semibold mt-4 w-24 text-center" type="submit" value="Add Plant"></input>
                </form>
            </div>
            <div className="flex items-center ml-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                    <PlantCard />
                    <PlantCard />
                    <PlantCard />
                    <PlantCard />
                    <PlantCard />
                    <PlantCard />
                    <PlantCard />
                    <PlantCard />
                    <PlantCard />
                    <PlantCard />
                    <PlantCard />
                    
                </div>
            </div>
        </div>
    )
}

export default PlantPage