import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useUserContext } from "./UserContext";
import Navbar from "./components/NavBar";
import LandingPage from "./components/LandingPage"
import Profile from "./components/Profile";
import Homepage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import PlantPage from "./components/PlantPage";
import PlantEntry from "./components/Entry";

function App() {
  const { user, setUser } = useUserContext()

  useEffect(() => {
    fetch('/auth')
    .then(res => {
      if (res.ok) {
        res.json().then(user => setUser(user))
      } else {
        res.json().then(() => setUser(null))
      }
    })
  }, [setUser])

  if (!user) return <LandingPage />

  return (
    <div className="flex h-full">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plants" element={<PlantPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route exact path="/entry/:id" element={<PlantEntry />} />
        </Routes>
    </div>
  )
}

export default App