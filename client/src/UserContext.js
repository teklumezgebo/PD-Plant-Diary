import React, { createContext, useContext, useState } from "react";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [results, setResults] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <UserContext.Provider value={{ user, setUser, results, setResults, searchTerm, setSearchTerm }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)