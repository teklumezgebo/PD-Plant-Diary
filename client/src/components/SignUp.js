import React, { useState } from "react"
import { useUserContext } from "../UserContext"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function SignUp() {
    const { setUser } = useUserContext()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(false)

    const signUpObj = {
        username: username,
        password: password
    }

    function handleSignUp(e) {
        e.preventDefault()
        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signUpObj)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(user => {
                    setUser(user)
                    navigate('/plants')
                })
            } else {
                res.json().then(res => setErrors(res))
            }
        })
    }

    return (
        <div className="bg-[#4A4E69] h-screen w-screen grid grid-col-1 place-items-center">
            <div className="bg-[#22223B] grid grid-col-1 w-80 h-80 place-items-center rounded-2xl shadow-lg gap-24">
                <form className="grid grid-col-1 gap-5 w-64 p-4 h-full" onSubmit={handleSignUp}>
                    <label className="text-[#F2E9E4] font-semibold" htmlFor="username">New Username:</label>
                    <input className="rounded-lg p-2" id="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                    <label className="text-[#F2E9E4] font-semibold" htmlFor="password">New Password:</label>
                    <input className="rounded-lg p-2" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input className="bg-[#9A8C98] w-20 mt-5 p-2 text-center rounded-lg hover:cursor-pointer hover:scale-105 duration-150 shadow-sm hover:text-[#F2E9E4]" type="submit" value="Sign Up"/>
                </form>
                <div className="grid grid-cols-1 gap- place-items-center">
                    {errors ? <div>{errors.errors.map(error => <div className="text-[#C9ADA7] text-center">{error}</div>)}</div> : null}
                </div>
            </div>
        </div>
    )
}

export default SignUp