import React, { useState } from 'react'
import './App.css'

function App() {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ role, setRole ] = useState("")

    const updateUsername = event => {
        setUsername(event.target.value)
    }

    const updatePassword = event => {
        setPassword(event.target.value)
    }

    const login = () => {
        
        const fetchURL = `user/login`

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };

        fetch(fetchURL, requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setRole(response.userRole)
                if (response.userRole === "ROLE_ADMIN") {

                } else if (response.userRole === "ROLE_USER") {

                }
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    return (
        <div className="main-page">
            <div className="login-wrapper">
                <div>Username</div>
                <input 
                    name="username"
                    // value={email}
                    onChange={updateUsername}
                />
                <div>Password</div>
                <input 
                    type="password" 
                    name="password"
                    // value={password}
                    onChange={updatePassword}
                />
                <div className="btns-wrapper">
                    <button className="btn login-btn" onClick={login}>Log in</button>
                    <button className="btn register-btn">Register</button>
                </div>
            </div>
        </div>
    )
}

export default App