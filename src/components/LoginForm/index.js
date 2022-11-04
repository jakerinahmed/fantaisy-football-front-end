import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import ReactDOM from "react-dom";
import axios from 'axios';
import './style.css'


export const LoginForm = (props) => {
    const navigate = useNavigate();
    let [authMode, setAuthMode] = useState(false)
    
    

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
            await axios.post('https://fantaisyfootball.herokuapp.com/register',{
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
            props.updateTokenCheck()
        }
        e.target.reset()
    }

    const login = async (username, password) => {
        try {
            console.log(username,password)
            let { data } = await axios.post('https://fantaisyfootball.herokuapp.com/login', {},{
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

    if (!authMode) {
        return (
            

            <div className="login-form-container">
                <div className="login-form-div">
                <div className='login-switches'>

                    <button onClick={() => setAuthMode(false)} style={{marginRight: '20px'}} className="button">Sign up</button>
                    <button onClick={() => setAuthMode(true)} className="button">Login</button>
                </div>
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
                        <div id="instructions">
                        <p>Finding your userID:</p>
                        <ul>
                            <li>To find your user id, please go to <a href='https://fantasy.premierleague.com/'>Fantasy premier league official website</a></li>
                            <li>Sign in and select the Points option</li>
                            <li>your user id is in the url  for example https://fantasy.premierleague.com/entry/<span style={{color:'#F71735'}}>UserID</span>/event/14, For example a url of https://fantasy.premierleague.com/entry/8102622/event/14 has a userID of 8102622.</li>
                        </ul>
                       
                        </div>
                    </div>

                    
                </div>
            </div>
           
        )
    }

    return (
        <div className="login-form-container">
                <div className="login-form-div">
                    <div className='login-switches'>

                    <button onClick={() => setAuthMode(false)} className="button">Sign up</button>
                    <button onClick={() => setAuthMode(true)} className="button">Login</button>
                    </div>
                        <hr></hr>
                    <div className="content">
                       
                        <form id="registerForm" onSubmit={handleLogin}>
                            <label>Username:</label>
                            <input name="name" id="name1" type="text" className='form-inputs' required></input>
                            <label>Password:</label>
                            <input name="password" id="password1" type="password" className='form-inputs' required></input>
                            <input type="submit" value="Submit" id="submit-signup"></input>
                        </form>
                        
                    </div>

                    
                </div>
            </div>
    )
}

export default LoginForm