import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import './App.css'
import AdminPage from './AdminPage'

function App() {

    const history = useHistory();

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const updateUsername = event => {
        setUsername(event.target.value)
    };

    const updatePassword = event => {
        setPassword(event.target.value)
    };

    const login = () => {

        const fetchURL = `user/login`;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };

        fetch(fetchURL, requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.userRole === "ROLE_ADMIN") {
                    history.push('/admin')
                } else if (response.userRole === "ROLE_USER") {
                    history.push('/user')
                }
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    return (

            <Switch>
                <Route path='/' exact>
                    <div className="main-page">
                        <div className="login-wrapper">
                            <div>Username</div>
                            <input
                                name="username"
                                onChange={updateUsername}
                            />
                            <div>Password</div>
                            <input
                                type="password"
                                name="password"
                                onChange={updatePassword}
                            />
                            <div className="btns-wrapper">
                                <button className="btn login-btn" onClick={login}>Log in</button>
                                <button className="btn register-btn">Register</button>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route path='/admin'  >
                    <AdminPage></AdminPage>
                </Route>
                <Route path='/user'  >
                    <div>
                        User page - Nothing to see here
                    </div>
                </Route>
            </Switch>
    )
}

export default App