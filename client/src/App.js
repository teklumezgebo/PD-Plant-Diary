import React from "react"
import Navbar from "./NavBar"
import Login from "./Login"
import { useUserContext } from "./UserContext"

function App() {
  const { user, setUser } = useUserContext()

  if (!user) return <Login />

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default App