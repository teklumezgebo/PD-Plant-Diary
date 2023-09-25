import React, { useState } from "react"
import { useUserContext } from "../UserContext"
import { useNavigate } from "react-router-dom"

function Login() {
    const { setUser } = useUserContext()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(false)

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
                res.json().then(user => {
                    setUser(user)
                    navigate('/plants')
                })
            } else {
                res.json().then(res => {
                    setUsername('')
                    setPassword('')
                    setErrors(res)
                })
            }
        })
    }

    return (
        <div className="bg-[#4A4E69] h-screen w-screen grid grid-col-1 place-items-center">
            <div className="bg-[#22223B] grid grid-col-1 w-80 h-80 place-items-center rounded-2xl shadow-lg gap-24">
                <form className="grid grid-col-1 gap-5 w-64 h-full p-4" onSubmit={handleLogin}>
                    <label className="text-[#F2E9E4] font-semibold" htmlFor="username">Username:</label>
                    <input className="rounded-lg p-2" id="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                    <label className="text-[#F2E9E4] font-semibold" htmlFor="password">Password:</label>
                    <input className="rounded-lg p-2" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input className="bg-[#9A8C98] w-20 mt-5 p-2 text-center rounded-lg hover:cursor-pointer hover:scale-105 hover:text-[#F2E9E4] duration-150 shadow-sm" type="submit" value="Login"/>
                </form>
                <div className="grid grid-cols-1 place-items-center">
                    {errors ? <div className="text-[#C9ADA7] text-center -mt-2">{errors.error}</div> : null}
                </div>
            </div>
        </div>
    )
}

export default Login