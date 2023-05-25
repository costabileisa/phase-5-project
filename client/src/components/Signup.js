import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import * as moment from 'moment'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

import { UserContext } from "../context/UserContext";

function Signup() {
  const { setLocalUser, setIsAuthenticated } = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    avatar_url: "",
    region: "",
    email: "",
    birthdate: "",
  })
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    fetch("/signup", {
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

  function handleLoginFormClick() {
    navigate("/login")
  }

  return (
    <div className="Signup">
      <h1>Spotify Clone</h1>
      <form onSubmit={handleSubmit}>
        <h1>Sign up to access the site.</h1>
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
        <input
          name='password_confirmation'
          type='password'
          placeholder='Confirm Password'
          value={credentials.password_confirmation}
          onChange={handleChange}
          required
        />
        <input
          name='avatar_url'
          type='text'
          placeholder='URL for avatar'
          value={credentials.avatar_url}
          onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label="Birthdate"
            inputFormat="MM/DD/YYYY"
            name='birthdate'
            value={moment(credentials.birthdate)}
            onChange={(e) => setCredentials({ ...credentials, ["birthdate"]: e._d.toDateString() })}
            inputProps={{
              style: {
                height: "0",
                fontSize: '19px',
                alignItems: 'center',
                paddingTop: '20px',
              },
            }}
            renderInput={(params) => <TextField
              {...params}
              sx={{ backgroundColor: 'white', marginBottom: '25px', borderRadius: '4px', }}
            />}
          />
        </LocalizationProvider>
        <input
          name='region'
          type='text'
          placeholder='Region'
          value={credentials.region}
          onChange={handleChange}
        />
        <input
          name='email'
          type='text'
          placeholder='Email address'
          value={credentials.email}
          onChange={handleChange}
        />
        <button className='signup-button' onClick={handleSubmit}>
          Signup
        </button>
        <button onClick={handleLoginFormClick}>
          Already have an account? Login.
        </button>
        <div className='title'>
          <p>Please fill out all fields.</p>
        </div>
        <div className='errordiv'>
          {errors ? errors.map((error) => {
            return <p key={error} className='error'>{error}</p>;
          }) : null}
        </div>
      </form>
    </div>
  )
}

export default Signup