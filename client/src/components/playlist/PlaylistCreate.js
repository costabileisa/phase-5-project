import React, { useState, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from 'react-router-dom'

import AddBoxIcon from '@mui/icons-material/AddBox'
import Button from '@mui/material/Button'

function PlaylistCreate() {
  const { setCurrentPlaylist, localUser, setLocalUser } = useContext(UserContext)
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

    const [playlistCover, setPlaylistCover] = useState(null)

    console.log('adding to state', playlistCover)

  function handleCreateAndRouteToPlaylist() {

    fetch('/playlists', {
      method: "POST",
      body: JSON.stringify({"": ""}),
    }).then((response) => {
      if (response.ok) {
        response.json().then((newPlaylist) => {
          console.log('create successful', newPlaylist)
          setCurrentPlaylist(newPlaylist)
          setLocalUser({ ...localUser, playlists: [...localUser.playlists, newPlaylist] })
          setTimeout(navigate(`/playlists/${newPlaylist.id}`), 1000)
        });
      } else {
        response.json().then((err) => setErrors(err.errors))
      }
    });
  };

  return (
    <>
    <Button className='sidebarOption'
      sx={{
        color: 'grey',
        textTransform: 'none',
        height: '30px',
        marginLeft: '-8px',
        fontSize: '16px',
      }}
      onClick={handleCreateAndRouteToPlaylist}
    >
      <AddBoxIcon
        className="sidebarOption_icon"
        />
      <h4 >Create A Playlist</h4>
    </Button>
    </>
  )
}

export default PlaylistCreate