import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useUserContext } from "./UserContext";
import Navbar from "./NavBar";
import Login from "./Login"
import Profile from "./Profile";
import Homepage from "./HomePage";
import Dashboard from "./Dashboard";
import PlantPage from "./PlantPage";

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

  if (!user) return <Login />

  return (
    <div className="flex">
        <Navbar />
        <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plants" element={<PlantPage />} />
        <Route path="/profile" element={<Profile />} />
        </Routes>
    </div>
  )
}

export default App