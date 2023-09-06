import React from "react";

function PlantCard() {
    return (
            <div className="max-w-sm overflow-hidden rounded-xl bg-[#FFE8D6] shadow-md duration-200 hover:scale-105 hover:shadow-xl">
                <img src="https://i.imgur.com/5dmBrx6.jpg" className="h-auto w-full"/>
                <div className="p-5">
                    <p className="text-medium mb-4 text-gray-700 font-bold">Plant Name, species</p>
                    <p className="text-medium mb-5 text-gray-700">Notes</p>
                    <button className="w-full rounded-md bg-[#96967A] py-2 text-white font-semibold hover:bg-[#C7C7B7] hover:shadow-md duration-75">View</button>
                </div>
            </div>
    )
}

export default PlantCard