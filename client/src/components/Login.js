import React, { useState, useContext } from "react"

import { useNavigate } from "react-router-dom"

import { UserContext } from "../context/UserContext";

function Login() {
  const { setLocalUser, setIsAuthenticated } = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })
  const [errors, setErrors] = ([])
  const navigate = useNavigate()

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    })
    .then(res => {
      if (res.ok) {
        res.json()
        .then(user => {
          setIsAuthenticated(true)
          setLocalUser(user)
        })
      } else {
        res.json()
        .then(err => setErrors(err.errors))
      }
    })
  }

  function handleSignUpFormClick() {
    navigate("/signup")
  }

  return (
    <div className="Login">
        <form onSubmit={handleSubmit}>
          <h1>Log in to Spotify Clone.</h1>
          <input
            name='username'
            type='text'
            placeholder='Username'
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button className='login-button' onClick={handleSubmit}>
            Log In
          </button>
          <button onClick={handleSignUpFormClick}>
            No Account? Sign Up!
          </button>
          <div className='errors'>
            {errors ? errors.map(error => {
              return <p key={error} className='error'>{error}</p>
            }) : null}
          </div>
        </form>
    </div>
  )
}

export default Login