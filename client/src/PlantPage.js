import React, { useState } from "react";

function PlantPage() {
    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [notes, setNotes] = useState('')

    
    return (
        <div >
            <form className="bg-[#DDBEA9] p-3 shadow-md rounded-lg">
                <input className="rounded-1g border-black hover:border-black" type="text" value={name} onChange={e => setName(e.target.value)} />
                <input type="text" value={species} onChange={e => setSpecies(e.target.value)} />
                <input type="text" value={notes} onChange={e => setNotes(e.target.value)} />
            </form>
        </div>
    )
}

export default PlantPage