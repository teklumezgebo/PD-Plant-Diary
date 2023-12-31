import React from "react";
import { Link } from "react-router-dom";

function PlantCard({ name, species, notes, image, id }) {
    return (
            <div className="max-w-md overflow-hidden rounded-xl bg-[#C9ADA7] shadow-md duration-200 hover:scale-105 hover:shadow-xl">
                <img src={image ? image.replace("http;//", "") : "https://i.imgur.com/5dmBrx6.jpg"} alt="plant" className="h-96 w-96"/>
                <div className="p-5">
                    <p className="text-medium mb-4 text-gray-700 font-bold">{name}, {species}</p>
                    <p className="text-medium mb-5 text-gray-700 truncate hover:text-clip">{notes}</p>
                    <Link to={`/entry/${id}`}><button className="w-full rounded-md bg-[#22223B] py-2 text-white font-semibold hover:bg-[#4A4E69] hover:shadow-md duration-75">View</button></Link>
                </div>
            </div>
    )
}

export default PlantCard