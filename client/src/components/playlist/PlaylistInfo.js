import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";

import PlaylistEdit from './PlaylistEdit';

import AddBoxIcon from '@mui/icons-material/AddBox';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function PlaylistInfo() {
  // sets state, params, navigate and context
  const { currentPlaylist, setCurrentPlaylist, localUser, setLocalUser } = useContext(UserContext);
  const navigate = useNavigate();
  const addPlaylistMessage = useRef('');
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState(currentPlaylist);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setForm(currentPlaylist)
  }, [currentPlaylist])

  function handleDeletePlaylist(e) {
    e.preventDefault()
    fetch(`/playlists/${currentPlaylist.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    }).then((res) => {
      if (res.ok) {
        let updatedPlaylists = localUser.playlists.filter((pl) => currentPlaylist.id !== pl.id)
        setLocalUser({ ...localUser, playlists: updatedPlaylists })
        setCurrentPlaylist({})
        navigate("/home")
      } else {
        res.json().then((err) => {
          setErrors(err.errors)
        })
      }
    })
    handleCloseDeleteMenu()
  }

  function handleAddPlaylistToSpotify() {
    let updatePackage = { ...localUser, playlists: currentPlaylist }
    fetch(`/spotify_api/save_playlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePackage)
    }).then((res) => {
      if (res.ok) {
        res.json().then((message) => {
          addPlaylistMessage.current = message.message
        })
      } else {
        res.json().then((error) => {
          addPlaylistMessage.current = error.error
        })
      }
    })
  }

  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null)
  const openDeletePlaylist = Boolean(deleteAnchorEl)
  const handleOpenDeleteMenu = (event) => {
    setTimeout(handleCloseDeleteMenu, 15000)
    setDeleteAnchorEl(event.currentTarget)
  };
  const handleCloseDeleteMenu = () => {
    setDeleteAnchorEl(null)
  };

  const [addPlaylistAnchorEl, setAddPlaylistAnchorEl] = useState(null)
  const openAddToPlaylist = Boolean(addPlaylistAnchorEl)
  const handleOpenAddToPlaylistMenu = (event) => {
    setTimeout(handleCloseAddToPlaylistMenu, 15000)
    setAddPlaylistAnchorEl(event.currentTarget)
  }
  const handleCloseAddToPlaylistMenu = () => {
    setAddPlaylistAnchorEl(null);
  }

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    setForm(currentPlaylist)
  }

  console.log('current playlist', currentPlaylist)

  return (
    <>
      <Grid container className="body" sx={{marginLeft: '-100px'}}>
        <div className="body__info">
          <div className='errordiv' style={{ marginLeft: '10em' }}>
            {errors.map((error) => {
              return <p key={error} className='error'>{error}</p>;
            })}
          </div>
          <div onClick={handleClickOpen} >
            <img className="image_class" src={currentPlaylist.cover_blob} alt={currentPlaylist.name} />
          </div>
          <div>

            <div style={{ marginTop: '-10px', marginBottom: '10px' }}>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={openDeletePlaylist ? 'long-menu' : undefined}
                aria-expanded={openDeletePlaylist ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleOpenDeleteMenu}
              >
                <MoreHorizIcon
                  sx={{
                    marginLeft: '-10px',
                    marginBottom: '-20px',
                    color: 'white',
                  }}
                />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={deleteAnchorEl}
                open={openDeletePlaylist}
                onClose={handleCloseDeleteMenu}
              >
                <MenuItem onClick={handleDeletePlaylist}>
                  Delete Playlist
                </MenuItem>
              </Menu>
            </div>

            {localUser.spotify_token ?
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={openAddToPlaylist ? 'long-menu' : undefined}
                  aria-expanded={openAddToPlaylist ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleOpenAddToPlaylistMenu}
                >
                  <AddBoxIcon
                    sx={{
                      marginLeft: '-10px',
                      marginBottom: '-20px',
                      color: 'white',
                    }}
                  />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={addPlaylistAnchorEl}
                  open={openAddToPlaylist}
                  onClose={handleCloseAddToPlaylistMenu}
                >
                  <MenuItem onClick={handleAddPlaylistToSpotify}>
                    Add Playlist To Spotify Account
                  </MenuItem>
                </Menu>
              </div>
              :
              <p>Login with Spotify to save this playlist to your account!</p>
            }

            <div className="body__infoText" onClick={handleClickOpen}>
              <h4>{currentPlaylist.name}</h4>
              <p>{currentPlaylist.description}</p>
              <p>{`${localUser.username}'s playlist`}</p>
              <p>{`${currentPlaylist.songs ? currentPlaylist.songs.length : 0} songs`}</p>
            </div>
          </div>

          <div>
            <PlaylistEdit 
              open={open} 
              setOpen={setOpen}
              handleClose={handleClose}
              form={form}
              setForm={setForm}
              setErrors={setErrors}
            />
          </div>
        </div>
      </Grid >
    </>
  );
};

export default PlaylistInfo;