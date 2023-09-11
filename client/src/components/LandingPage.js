import React, { useState } from "react";
import { useUserContext } from "../UserContext";

function LandingPage() {
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [signUpUsername, setSignUpUsername] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [loginForm, setLoginForm] = useState(false)
    const [signUpForm, setSignupForm] = useState(false)

    const { setUser } = useUserContext()

    const loginObj = {
        username: loginUsername,
        password: loginPassword
    }

    const signUpObj = {
        username: signUpUsername,
        password: signUpPassword
    }

    function handleLoginForm() {
        if (signUpForm) {
            setSignupForm(false)
            setLoginForm(true)
        } else if (signUpForm === false && loginForm === true) {
            setLoginForm(false)
        } else if (signUpForm === false && loginForm === false) {
            setLoginForm(true)
        }
    }

    function handleSignUpForm() {
        if (loginForm) {
            setLoginForm(false)
            setSignupForm(true)
        } else if (loginForm === false && signUpForm === true) {
            setSignupForm(false)
        } else if (signUpForm === false && loginForm === false) {
            setSignupForm(true)
        }
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

    return (
        <div className="flex flex-col bg-[#64705C] h-screen justify-top items-center">
                <div className="text-black text-center font-semibold text-9xl mt-5 bg-[#FFF5D6] w-auto rounded-xl p-3 shadow-xl">PD</div>
                <div className="text-black text-center font-thin text-3xl bg-[#FFF5D6] w-auto rounded-lg p-3 mt-10 shadow-xl">The all in one plant tracking app.</div>
                <div className="flex flex-row mt-8 gap-5">
                    <div className={`text-black text-center font-semibold ${loginForm ? 'bg-[#6F6F57] scale-90' : 'bg-[#B7B7A4] hover:scale-105'} w-20 p-2 rounded-lg shadow-md  hover:cursor-pointer duration-300`} onClick={handleLoginForm}>Login</div>
                    <div className={`text-black text-center font-semibold ${signUpForm ? 'bg-[#BD8058] scale-90' : 'bg-[#DDBEA9] hover:scale-105'}  w-20 p-2 rounded-lg shadow-md  hover:cursor-pointer duration-300`} onClick={handleSignUpForm}>Sign Up</div>
                </div>
                <div className="flex flex-row justify-center relative items-center mt-6 mr-64 bg-black">
                 <div className={`${loginForm ? 'scale-100' : 'scale-0'} absolute top-0 left-0  bg-[#B7B7A4] shadow-xl hover:scale-105 duration-150 flex flex-row gap-5 h-80 w-72 rounded-xl justify-start p-6 transition-all`}>
                    <div className="flex flex-col gap-3 shadow-lg bg-[#FFF5D6] p-4 rounded-xl -ml-2">
                        <form onSubmit={handleLogin}>
                            <div className="font-bold text-sm">Username:</div>
                            <input className="text-black  h-10 w-56 text-left p-3 rounded-2xl shadow-lg" type="text" value={loginUsername} onChange={e => setLoginUsername(e.target.value)}/>
                            <div className="font-bold text-sm mt-4">Password:</div>
                            <input className="text-black h-10 w-56 text-left p-3 rounded-2xl shadow-lg" type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)}/>
                            <input className="bg-[#6B705C]  shadow-md hover:scale-105 hover:cursor-pointer hover:text-white duration-300 text-black font-semibold h-12 w-20 mt-16 text-center p-3 rounded-2xl" type="submit" value="Login"/>
                        </form>
                    </div>
                 </div>
                    <div className={`bg-[#FFF5D6] ${signUpForm ? 'scale-100' : 'scale-0'} absolute left-0 top-0 shadow-xl hover:scale-105 duration-150 flex flex-row gap-5 h-80 w-72 rounded-xl justify-start p-6 transition-all `}>
                        <div className="flex flex-col gap-3 shadow-xl bg-[#B7B7A4] p-4 rounded-xl -ml-2">
                            <form onSubmit={handleSignUp}>
                                <div className="font-bold text-sm">New Username:</div>
                                <input className="text-black  h-10 w-56 text-left p-3 rounded-2xl shadow-lg" type="text" value={signUpUsername} onChange={e => setSignUpUsername(e.target.value)}/>
                                <div className="font-bold text-sm mt-4">New Password:</div>
                                <input className="text-black h-10 w-56 text-left p-3 rounded-2xl shadow-lg" type="password" value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)}/>
                                <input className="bg-[#CC9E80]  shadow-md hover:scale-105 hover:cursor-pointer hover:text-white duration-300 text-black font-semibold h-12 w-20 mt-16 text-center p-3 rounded-2xl" type="submit" value="Sign Up"/>
                            </form>
                        </div>
                    </div>
                </div> 
        </div>
    )
}

export default LandingPage