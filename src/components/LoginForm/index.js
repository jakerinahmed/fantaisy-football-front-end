import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import ReactDOM from "react-dom";

export const LoginForm = (props) => {
    const navigate = useNavigate();
    let [authMode, setAuthMode] = useState("signin")

    useEffect(() => {
        if (!!localStorage.getItem('token')) {
            navigate("/")
        }
    }, [])

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const setLocalStorage = (token) => {
        const decodedToken = jwt_decode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('username', decodedToken.username);
        localStorage.setItem('user_id', decodedToken.user_id);
        navigate("/")
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        // here we do a post function to the login route
        // const token = await login(e.target.name1.value, e.target.password1.value);
        // if (token === 401) {
        //     alert('Login failed. Please try again');
        // } else {
        //     setLocalStorage(token)
        // }
        // e.target.reset()
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        // if (e.target.password2.value === e.target.confirmpassword2.value) {
        //     // here we do a post to the register
        //     const error = await register(e.target.name2.value, e.target.password2.value)
        //     if (!error) {
        //         const token = await login(e.target.name2.value, e.target.password2.value);
        //         setLocalStorage(token)
        //     } else {
        //         alert('User already exists');
        //     }
        // } else {
        //     alert('Passwords do not match');
        // }
        // e.target.reset()
    }

    if (authMode === "signin") {
        return (
            <div className="overlay">
                <div className="wrapper">
                    <h2>Sign up</h2>
                        <hr></hr>
                        <a href="#" id="close1" class="close">&times;</a>
                    <div className="content">
                        <div className="container">
                            <form id="registerForm">
                                <label>Username:</label>
                                <input name="name" id="name1" type="text"  required></input>
                                
                                <label>Password:</label>
                                <input name="password" id="password1" type="password"  required></input>
                                <label>Confirm password:</label>
                                <input name="confirmpassword" id="confirmpassword1" type="password" required></input>
                                <input type="submit" value="Submit"></input>
                            </form>
                        </div>
                    </div>

                    {/* <form  role={'form'} className="Auth-form" id="loginForm" onSubmit={handleLogin}>
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Sign In</h3>
                            <div className="text-center">
                                Not registered yet?{" "}
                                <span role={'signUpBtn'} className="link-primary" onClick={changeAuthMode}>
                                    Sign Up
                                </span>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="name1">Username:</label>
                                <input
                                    type="text"
                                    id="name1"
                                    className="form-control mt-1"
                                    placeholder="Enter username"
                                    required
                                    />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="password1">Password:</label>
                                <input
                                    type="password"
                                    id="password1"
                                    className="form-control mt-1"
                                    placeholder="Enter password"
                                    required
                                    />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <input role={'submit'} type="submit" value="Login" className="py-2" />
                            </div>
                        </div>
                    </form> */}
                </div>
            </div>
        )
    }

    return (
        <div className="overlay">
           <div className='wrapper'>
                <h2>Hello world</h2>
                {/* <form role={'form'} className="Auth-form" id="registerForm" onSubmit={handleRegister}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Register</h3>
                        <div className="text-center">
                            Already registered?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign In
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="name2">Username:</label>
                            <input
                                type="text"
                                id="name2"
                                className="form-control mt-1"
                                placeholder="Enter username"
                                required
                                />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="password2">Password:</label>
                            <input
                                type="password"
                                id="password2"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                required
                                />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="confirmpassword2">Confirm password:</label>
                            <input
                                type="password"
                                id="confirmpassword2"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <input type="submit" value="Register" className="py-2" />
                        </div>
                    </div>
                </form> */}
            </div>
        </div>
    )
}

export default LoginForm