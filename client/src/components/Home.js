import React from "react"

import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="Home">
      <h1>Welcome to Spotify Clone</h1>
      <h4>Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>.</h4>
    </div>
  )
}

export default Home