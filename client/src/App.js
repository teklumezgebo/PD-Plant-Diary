import React from "react"
import Navbar from "./NavBar"
import { useUserContext } from "./UserContext"

function App() {
  const { user, setUser } = useUserContext()

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default App