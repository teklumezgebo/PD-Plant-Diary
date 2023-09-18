import React, { useState } from "react";

function Dashboard() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState('')

    function handleSearch(e) {
        e.preventDefault()
        fetch(`https://perenual.com/api/species-care-guide-list?key=sk-96T76508ba2106a792196&q=${search}`)
        .then(res => {
            if (res.ok) {
                res.json().then(plants => setResults(plants))
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }

    return (
        <div className="h-screen w-full grid grid-cols-3 place-items-start bg-[#4A4E69] p-6 m-9 rounded-2xl">
            <form className="bg-[#C9ADA7] col-span-2 p-4 w-1/3 h-2/5 grid grid-cols-1 gap-2 rounded-lg shadow-lg">
                <input className="rounded-xl text-left p-2 text-xl h-4/5" placeholder="Search Plants..." value={search} onChange={e => setSearch(e.target.value)}/>
                <input className="bg-[#22223B] text-[#F2E9E4] rounded-xl hover:cursor-pointer hover:scale-105 duration-150 font-semibold" type="submit" value="Search"/>
            </form>
            <div className="bg-[#F2E9E4] col-span-3 w-full h-full rounded-3xl grid grid-cols-1 p-4 place-items-start gap-2">
                <div>Name</div>
                <div>Name</div>
                <div>Name</div>
            </div>
        </div>
    )
}

export default Dashboard