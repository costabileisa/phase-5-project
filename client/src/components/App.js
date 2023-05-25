// test 2
import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import { UserContext } from "../context/UserContext"

import Grid from '@mui/material/Grid'

import NavBar from "./NavBar"
import Login from "./Login"
import Signup from "./Signup"
import Footer from "./Footer"
import Header from "./Header"
import Playlist from "./Playlist"
import Profile from "./Profile"
import Search from "./Search"
import Home from "./Home"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [localUser, setLocalUser] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState({});
  const [currentTrack, setCurrentTrack] = useState();
  const [currentQueue, setCurrentQueue] = useState([]);
  const [mainSearch, setMainSearch] = useState('');
  const [playState, setPlayState] = useState(false);
  const [errors, setErrors] = useState([])

  useEffect(() => {
    fetch("/me")
      .then(r => {
        if (r.ok) {
          r.json()
            .then(data => {
              setIsAuthenticated(true);
              setLocalUser(data);
            })
        } else {
          r.json()
            .then(err => setErrors(err.errors))
        }
      })
  }, []);

  if (!isAuthenticated)
    return (
      <UserContext.Provider value={{ setIsAuthenticated, setLocalUser }}>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserContext.Provider>
    );

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          localUser,
          setLocalUser,
          currentPlaylist,
          setCurrentPlaylist,
          currentTrack,
          setCurrentTrack,
          currentQueue,
          setCurrentQueue,
          mainSearch,
          setMainSearch,
          playState,
          setPlayState
        }}
      >
        <Grid container>
          <Grid item >
            <NavBar />
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            <Header />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/playlists/:id" element={<Playlist />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>

          </Grid>
        </Grid>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
