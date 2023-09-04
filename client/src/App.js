import React from "react"
import { Route, Routes } from 'react-router-dom';
import Navbar from "./NavBar"
import Login from "./Login"
import Profile from "./Profile"
import { useUserContext } from "./UserContext"

function App() {
  const { user } = useUserContext()

  if (!user) return <Login />

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App