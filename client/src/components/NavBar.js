import React, { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Link, useNavigate } from "react-router-dom"

// import PlaylistCreate from "../Pages/PlaylistCreate";

import { Avatar } from "@mui/material";
import { Typography } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic"
import LoginIcon from "@mui/icons-material/Login"
import SearchIcon from "@mui/icons-material/Search"

function Navbar() {
  const { localUser } = useContext(UserContext)
  const navigate = useNavigate()

  const ListUserPlaylists = () => {
    let updatedPlaylistLinks = localUser.playlists
      .sort((a, b) => a.id - b.id)
      .map((playlist) => {
        return (
          <Link
            to={`playlists/${playlist.id}`}
            className='sidebarPlaylists'
            key={playlist.name}
          >
            <Avatar
              src={playlist.image}
              className="sidebarOption_icon"
            />
            <h4>{playlist.name}</h4>
          </Link>
        )
      })
    return updatedPlaylistLinks
  };

  function reload() {
    navigate("/")
    window.location.reload()
  };

  return (
    <div className='NavBar'>
      <h1
        className='logo'
        onClick={() => { reload() }}
        style={{ cursor: 'pointer' }}
      >
        Spotify Clone
      </h1>
      <Link to="/home" className='sidebarOption'>
        <HomeIcon className="sidebarOption_icon" />
        <h4>Home</h4>
      </Link>
      <Link to="/search" className='sidebarOption'>
        <SearchIcon className="sidebarOption_icon" />
        <h4>Search</h4>
      </Link>
      <a component='a' href="https://spotify-app-8rdu.onrender.com/auth/spotify" className='sidebarOption' onClick={() => { }}>
        <LoginIcon className="sidebarOption_icon" />
        <h4>Sign in with Spotify</h4>
      </a>
      <PlaylistCreate />
      <Typography variant="h6" className='sidebar_title' sx={{ marginTop: '2em', color: 'grey' }}>
        My Playlists
      </Typography>
      <hr />
      <ListUserPlaylists />
    </div>
  );
};

export default Navbar;