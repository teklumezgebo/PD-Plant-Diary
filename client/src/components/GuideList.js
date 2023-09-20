import React, { useState } from "react";
import SearchCard from "./SearchCard";
import { useUserContext } from "../UserContext";

function GuideList() {
    const { setResults, results, searchTerm, setSearchTerm } = useUserContext()
    const [search, setSearch] = useState('')
    
    function handleSearch(e) {
        e.preventDefault()
        fetch(`https://perenual.com/api/species-care-guide-list?key=&q=${search}`)
        .then(res => {
            if (res.ok) {
                res.json().then(plants => {
                    setResults(plants)
                    setSearchTerm(search)
                    setSearch('')
                })
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }

    return (
        <div className={`${results ? 'h-full' : 'h-screen'} w-full grid grid-cols-3 place-items-start gap-5 bg-[#4A4E69] p-6 m-9 rounded-2xl`}>
            <form className="bg-[#C9ADA7] col-span-2 p-4 w-3/5 h-26 grid grid-cols-2 gap-3 rounded-lg shadow-lg" onSubmit={handleSearch}>
                <input className="rounded-xl text-left p-2 text-xl h-20" placeholder="Search Plant Guides..." value={search} onChange={e => setSearch(e.target.value)}/>
                <input className="bg-[#22223B] text-[#F2E9E4] h-20 rounded-xl hover:cursor-pointer hover:scale-105 duration-150 font-semibold" type="submit" value="Search"/>
            </form>
            {results ? <div className="bg-[#F2E9E4] col-span-3 w-full h-full rounded-3xl grid grid-cols-6 p-8 place-items-center gap-4">
                <div className="bg-[#22223B] w-1/3 text-center text-[#F2E9E4] rounded-lg p-4 col-span-6 shadow-lg mb-5">Showing Results for "{searchTerm}"</div>
                {results.data.map(plant => <SearchCard key={plant.id} id={plant.id} commonName={plant.common_name} scientificName={plant.scientific_name} section={plant.section} />)}
            </div> : null}
        </div>
    )
}

export default GuideList