import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import ReactDOM from "react-dom";
import axios from 'axios';

export const LoginForm = (props) => {
    const navigate = useNavigate();
    let [authMode, setAuthMode] = useState("signin")
    
    

    useEffect(() => {
        if (!!localStorage.getItem('token')) {
            navigate("/recommendations")
        }
    }, [])

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const setLocalStorage = (token) => {
        const decodedToken = jwt_decode(token);
        localStorage.setItem('token', token);
        // localStorage.setItem('username', decodedToken.username);
        localStorage.setItem('user_id', decodedToken.user_id);
        navigate("/recommendations")
    }

    const register = async (username, password, userID) => {
        try {
            console.log(username, password,userID)
            await axios.post('http://127.0.0.1:5000/register',{
                    username: username,
                    password:password,
                    user_id: userID
                })
            return 0
        } catch (err) {
            console.error(err.message)
            return 1
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        // here we do a post function to the login route
        const token = await login(e.target.name1.value, e.target.password1.value);
        if (token === 401) {
            alert('Login failed. Please try again');
        } else {
            setLocalStorage(token)
        }
        e.target.reset()
    }

    const login = async (username, password) => {
        try {
            console.log(username,password)
            let { data } = await axios.post('http://127.0.0.1:5000/login', {},{
                auth: {
                username: username,
                password: password
              }})

            return data.token
        } catch (err) {
            if (err.response.status === 401) {
                console.error(err.message)
                return err.response.status
            } else {
                console.warn(err.message)
            }
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        console.log(e.target.userID.value)
        if (e.target.password.value === e.target.confirmpassword.value) {
            // here we do a post to the register
            const error = await register(e.target.name.value, e.target.password.value, e.target.userID.value)

            if (!error) {

                const token = await login(e.target.name.value, e.target.password.value)
                setLocalStorage(token)
                props.updateTokenCheck()
            } else {
                alert('User already exists');
            }
           
        } else {
            alert('Passwords do not match');
        }
        e.target.reset()
    }

    if (authMode === "signin") {
        return (
            

            <div className="login-form-container">
                <div className="login-form-div">
                    <h2>Sign up</h2>
                        <hr></hr>
                    <div className="content">
                       
                        <form id="registerForm" onSubmit={handleRegister}>
                            <label>Username:</label>
                            <input name="name" id="name1" type="text" className='form-inputs' required></input>
                            
                            <label>Password:</label>
                            <input name="password" id="password1" type="password" className='form-inputs' required></input>
                            <label>Confirm password:</label>
                            <input name="confirmpassword" id="confirmpassword1" type="password" className='form-inputs' required></input>
                            <label>UserID:</label>
                            <input name="userID" id="userID" type="text" className='form-inputs' required></input>
                            <input type="submit" value="Submit" id="submit-signup"></input>
                        </form>
                        
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
                
            </div>
        </div>
    )
}

export default LoginForm