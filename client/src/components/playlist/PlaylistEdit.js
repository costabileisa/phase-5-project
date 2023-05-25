import React, { useContext, useState } from "react"
import { useParams } from 'react-router-dom'
import { UserContext } from "../../context/UserContext.js"

import Button from '@mui/material/Button'
import ClearIcon from '@mui/icons-material/Clear'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

function PlaylistEdit({ open, setOpen, handleClose, form, setForm, setErrors }) {
  const { currentPlaylist, setCurrentPlaylist, localUser, setLocalUser } = useContext(UserContext)

  const params = useParams()

  const [playlistCover, setPlaylistCover] = useState(null)

  // function handleSave(e) {
  //   e.preventDefault()
  //   fetch(`/playlists/${currentPlaylist.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(uploadForm)
  //   }).then(res => {
  //     if (res.ok) {
  //       res.json().then(updatedPlaylist => {
  //         setCurrentPlaylist(updatedPlaylist)
  //         let updatedPlaylists = localUser.playlists.map(p => {
  //           if (params.id === p.id.toString()) {
  //             return updatedPlaylist
  //           } else {
  //             return p
  //           }
  //         })
  //         setLocalUser({ ...localUser, playlists: updatedPlaylists })
  //       });
  //     } else {
  //       res.json().then(err => {
  //         setErrors(err.error)
  //       })
  //     }
  //   })
  //   setOpen(false)
  // }

  function handleUpdate(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleFormNameClear(e) {
    setForm({ ...form, [e]: '' })
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: 'transparent' }}
    >
      <DialogTitle
        sx={{ backgroundColor: '#3b3637', color: 'white' }}
      >Update details</DialogTitle>
      <DialogContent
        sx={{ backgroundColor: '#3b3637' }}
      >
        <DialogContentText
          sx={{ color: 'white' }}
        >
          To make changes, please be sure to click save below.
        </DialogContentText>
        <TextField
          sx={{ input: { color: 'white' } }}
          margin="dense"
          name="name"
          fullWidth
          variant="standard"
          onChange={handleUpdate}
          value={form.name}
          InputProps={{
            endAdornment: (
              <div >
                <InputAdornment position="start">
                  <IconButton onClick={() => { handleFormNameClear('name') }}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              </div>
            )
          }}
        />
        <TextField
          sx={{ input: { color: 'white' } }}
          margin="dense"
          name="description"
          fullWidth
          variant="standard"
          onChange={handleUpdate}
          value={form.description}
          InputProps={{
            endAdornment: (
              <div >
                <InputAdornment position="start">
                  <IconButton onClick={() => { handleFormNameClear('description') }}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              </div>
            )
          }}
        />
        <TextField
          sx={{ input: { color: 'white' } }}
          margin="dense"
          name="image"
          fullWidth
          variant="standard"
          onChange={handleUpdate}
          value={form.image}
          InputProps={{
            endAdornment: (
              <div >
                <InputAdornment position="start">
                  <IconButton onClick={() => { handleFormNameClear('image') }}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              </div>
            )
          }}
        />
        <Button
          variant="contained"
          component="label"
        >
          Select An Image
        </Button>
          <div> {playlistCover ? playlistCover.name : ''} </div>
      </DialogContent>
      <DialogActions
        sx={{ backgroundColor: '#3b3637' }}
      >
        <Button onClick={handleClose}
          sx={{ color: 'white' }}
        >Cancel</Button>
        {/* <Button onClick={handleSave}
          sx={{ color: 'white' }}
        >Save</Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistEdit