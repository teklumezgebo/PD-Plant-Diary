import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useUserContext } from "./UserContext";
import Login from "./components/Login"
import SignUp from "./components/SignUp";
import Navbar from "./components/NavBar";
import LandingPage from "./components/LandingPage"
import Profile from "./components/Profile";
import GuideList from "./components/GuideList";
import PlantPage from "./components/PlantPage";
import PlantEntry from "./components/Entry";
import Guide from "./components/Guide";

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

  return (
    <div>
        { !user ? 
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes> : 
          <div className="flex h-full">
            <Navbar />
            <Routes>
              <Route path="/plants" element={<PlantPage />} />
              <Route path="/guides" element={<GuideList />} />
              <Route path="/profile" element={<Profile />} />
              <Route exact path="/entry/:id" element={<PlantEntry />} />
              <Route exact path="/guides/:id" element={<Guide />} />
            </Routes>
          </div> }
    </div>
  )
}

export default App