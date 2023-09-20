import React, { useState } from "react"
import { useUserContext } from "../UserContext"

function Login() {
    const { setUser } = useUserContext()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginObj = {
        username: username,
        password: password
    }

    function handleLogin(e) {
        e.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginObj)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(user => setUser(user))
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }

    return (
        <div className="bg-[#4A4E69] h-screen w-screen grid grid-col-1 place-items-center">
            <div className="bg-[#22223B] grid grid-col-1 w-96 h-80 place-items-center rounded-2xl shadow-lg">
                <form className="grid grid-col-1 gap-5 w-64" onSubmit={handleLogin}>
                    <label className="text-[#F2E9E4] font-semibold" htmlFor="username">Username:</label>
                    <input className="rounded-lg p-2" id="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                    <label className="text-[#F2E9E4] font-semibold" htmlFor="password">Password:</label>
                    <input className="rounded-lg p-2" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input className="bg-[#9A8C98] w-20 mt-5 p-2 text-center rounded-lg hover:cursor-pointer hover:scale-105 duration-150 shadow-sm" type="submit" value="Login"/>
                </form>
            </div>
        </div>
    )
}

export default Login