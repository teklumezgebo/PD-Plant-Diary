import React from "react";
import { Link } from "react-router-dom";

function SearchCard({ id, commonName, scientificName }) {
    return (
            <div className="w-60 h-48 overflow-hidden rounded-xl bg-[#9A8C98] shadow-md duration-200 hover:scale-105 hover:shadow-xl">
                <div className="p-5">
                    <p className="text-sm mb-4 text-gray-700 font-bold">{commonName}</p>
                    <p className="text-sm mb-5 text-gray-700 truncate hover:text-clip">{scientificName}</p>
                    <br></br>
                    <Link to={`/guides/${id}`}><button className="w-full rounded-md bg-[#22223B] py-2 text-white font-semibold hover:bg-[#4A4E69] hover:shadow-md duration-75">View</button></Link>
                </div>
            </div>
    )
}

export default SearchCard