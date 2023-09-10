import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../UserContext";

function LandingPage() {
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [signUpUsername, setSignUpUsername] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')

    const { setUser } = useUserContext()

    const loginObj = {
        username: loginUsername,
        password: loginPassword
    }

    const signUpObj = {
        username: signUpUsername,
        password: signUpPassword
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

    function handleSignUp(e) {
        e.preventDefault()
        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signUpObj)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(user => setUser(user))
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }

    //     <form className="bg-white p-8 shadow-md rounded-lg" onSubmit={handleSignUp}>
    //     <input type="text" value={signUpUsername} onChange={e => setSignUpUsername(e.target.value)} placeholder="username" />
    //     <input type="password" value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} placeholder="password" />
    //     <input type="submit" />
    // </form>
    // <form className="bg-black p-8 shadow-md rounded-lg" onSubmit={handleLogin}>
    //     <input type="text" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} placeholder="username" />
    //     <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="password" />
    //     <input className="text-stone-100" type="submit" />
    // </form>

    return (
        <div className="flex flex-col bg-[#64705C] h-screen justify-center items-center">
                <div className="text-black text-center font-semibold text-9xl bg-[#FFF5D6] w-auto rounded-lg p-3">PD</div>
                <div className="text-black text-center font-thin text-3xl bg-[#FFF5D6] w-auto rounded-lg p-3 mt-5">The all in one plant tracking app.</div>
                <div className="flex flex-row mt-8 gap-5">
                    <Link to="/login"><div className="text-black text-center font-semibold bg-[#DDBEA9] w-20 p-2 rounded-lg shadow-md hover:scale-105 hover:cursor-pointer duration-300">Login</div></Link>
                    <Link to="/signup"><div className="text-black text-center font-semibold bg-[#B7B7A4] w-20 p-2 rounded-lg shadow-md hover:scale-105 hover:cursor-pointer duration-300">Sign Up</div></Link>
                </div>
        </div>
    )
}

export default LandingPage