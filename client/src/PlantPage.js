import React, { useState } from "react";

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
                res.json().then(res => console.log(res))
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }

    
    return (
        <div className="flex-1 flex items-start  justify-left mt-5 ml-10">
            <form className="bg-[#DDBEA9] p-4 shadow-md rounded-lg flex flex-col w-80" onSubmit={handleNewPlant}>
                <input className="rounded border border-white hover:border-black duration-150 text-sm mb-4 indent-1 w-36 h-9" type="text" value={name} onChange={e => setName(e.target.value)} />
                <input className="rounded border border-white hover:border-black duration-150 text-sm mb-4 indent-1 w-44 h-9" type="text" value={species} onChange={e => setSpecies(e.target.value)} />
                <textarea className="rounded resize-y border border-white hover:border-black duration-150 text-sm indent-1 w-50" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes..." />
                <input className="rounded border border-[#6B705C] bg-[#6B705C] text-black hover:text-white duration-200 font-semibold mt-4 w-24 text-center" type="submit" value="Add Plant"></input>
            </form>
        </div>
    )
}

export default PlantPage