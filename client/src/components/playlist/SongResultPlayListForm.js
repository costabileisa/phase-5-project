import React, { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import CardActionArea from "@mui/material/CardActionArea"
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar'

function SongResultPlayListForm({ track }) {
  const { localUser, setLocalUser } = useContext(UserContext)
  const [addToPlaylist, setAddToPlaylist] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState({ id: '' })
  const [successOpen, setSuccessOpen] = useState(false)
  const [errors, setErrors] = useState([])

  function handleLocalPlaylistSelect(e) {
    let thisPlaylist = localUser.playlists.find((playlist) => playlist.id === e.target.value)
    setSelectedPlaylist(thisPlaylist)
  }

  function handleLocalPlaylistDeselect() {
    setSelectedPlaylist({ id: '' })
  }

  function handleDisplayAddToPlaylistSelect() {
    setAddToPlaylist(!addToPlaylist)
  }

    function handleSuccessClose() {
      setSuccessOpen(false)
    };

  function handleAddSongToPlaylist() {
    let songGenre = track.album.genres === null ? null : track.album.genres[0]
    console.log(track.album)
    fetch(`/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        release_date: track.album.release_date,
        name: track.name,
        genre: songGenre,
        playlist_id: selectedPlaylist.id,
        spotify_id: track.id,
        spotify_album_id: track.album.id,
        preview_url: track.preview_url,
      })
    }).then((res) => {
      if (res.ok) {
        res.json()
        .then(newSong => {
          let updatedPlaylists = localUser.playlists.map(p => {
            if (selectedPlaylist.id === p.id) {
              p.songs.push(newSong)
              return p
            } else {
              return p
            }
          })
          setLocalUser({ ...localUser, playlists: updatedPlaylists })
          setSuccessOpen(true)
        })
      } else {
        res.json()
        .then(err => setErrors(err.error))
      }
    })
  }

  return (
    <div className="SongResultPlayListForm">
      <CardActions>
        <Button size="small" onClick={() => handleDisplayAddToPlaylistSelect()}>Add to playlist...</Button>
      </CardActions>
      <CardActionArea sx={{ marginLeft: '10px' }}>
        {addToPlaylist ?
          <FormControl variant="outlined" style={{ minWidth: 150, marginLeft: '-15px' }} >
            <InputLabel id="playlist-select">Select Playlist</InputLabel>
            <Select
              labelId="playlist-select"
              id="playlist-select"
              value={selectedPlaylist.id}
              onChange={handleLocalPlaylistSelect}
              label="selectedPlaylist"
            >
              <MenuItem value={selectedPlaylist.id} onClick={(e) => handleLocalPlaylistDeselect(track, e)}> Select A Playlist </MenuItem>
              {localUser.playlists.map((playlist) => {
                let id = playlist.id
                return (
                  <MenuItem key={id} value={id} >{`${playlist.name}`}</MenuItem>
                )
              })}
            </Select>
          </FormControl >
          :
          <></>
        }
      </CardActionArea>
      {addToPlaylist ?
        <Button
          size="small"
          onClick={handleAddSongToPlaylist}
          sx={{ marginLeft: '10px', marginBottom: '10px' }}
        >Add Song</Button>
        :
        <></>
      }
      <Snackbar open={successOpen} autoHideDuration={1000} onClose={handleSuccessClose}>
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {successOpen ?
            `You have successfully added "${track.name}" to ${selectedPlaylist.name}`
            :
            ''
          }
        </Alert>
      </Snackbar>
      <div className='errordiv'>
        {errors ? errors.map((error) => {
          return <p key={error} className='error'>{error}</p>
        }) : null}
      </div>
    </div>
  );
};

export default SongResultPlayListForm