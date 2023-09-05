import React from "react";
import { Route, Routes } from "react-router-dom";
import { useUserContext } from "./UserContext";
import Navbar from "./NavBar";
import Login from "./Login"
import Profile from "./Profile";
import Homepage from "./HomePage";
import Dashboard from "./Dashboard";
import PlantPage from "./PlantPage";

function App() {
  const { user } = useUserContext()

  if (!user) return <Login />

  return (
    <div className="flex">
        <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plants" element={<PlantPage />} />
        <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default App