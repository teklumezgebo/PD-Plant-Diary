import React from "react";

function PlantCard({ name, species, notes }) {
    return (
            <div className="max-w-sm overflow-hidden rounded-xl bg-[#FFE8D6] shadow-md duration-200 hover:scale-105 hover:shadow-xl">
                <img src="https://i.imgur.com/5dmBrx6.jpg" alt="plant" className="h-auto w-full"/>
                <div className="p-5">
                    <p className="text-medium mb-4 text-gray-700 font-bold">{name}, {species}</p>
                    <p className="text-medium mb-5 text-gray-700">{notes}</p>
                    <button className="w-full rounded-md bg-[#B7B7A4] py-2 text-white font-semibold hover:bg-[#96967A] hover:shadow-md duration-75">View</button>
                </div>
            </div>
    )
}

export default PlantCard