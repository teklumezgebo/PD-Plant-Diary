import React, { useState } from "react";

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white p-8 shadow-md rounded-lg">
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
            </form>
        </div>
    )
}

export default Login