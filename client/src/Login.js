import React, { useState } from "react";
import { useUserContext } from "./UserContext";

function Login() {
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
                res.json().then(res => console.log(res))
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white p-8 shadow-md rounded-lg" onSubmit={handleSignUp}>
                <input type="text" value={signUpUsername} onChange={e => setSignUpUsername(e.target.value)} placeholder="username" />
                <input type="password" value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} placeholder="password" />
                <input type="submit" />
            </form>
            <br></br>
            <form className="bg-black p-8 shadow-md rounded-lg" onSubmit={handleLogin}>
                <input type="text" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} placeholder="username" />
                <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="password" />
                <input className="text-stone-100" type="submit" />
            </form>
        </div>
    )
}

export default Login