import React from "react";
import { Route, Routes } from "react-router-dom";
import { useUserContext } from "./UserContext";
import Navbar from "./NavBar";
import Login from "./Login"
import Profile from "./Profile";
import Homepage from "./HomePage";

function App() {
  const { user } = useUserContext()
  
  if (!user) return <Login />

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route exact path="/" element={<Homepage />} />
      </Routes>
    </div>
  )
}

export default App