import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

import PlaylistInfo from "./PlaylistInfo";
import PlaylistSongRow from "./PlaylistSongRow";
import SongRow from "./SongRow";

import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Snackbar from '@mui/material/Snackbar';

function Playlist() {
  const { currentPlaylist, setCurrentPlaylist, localUser, setLocalUser } = useContext(UserContext);
  const params = useParams();
  const addSongMessage = useRef('');

  const [search, setSearch] = useState('');
  const [tracks, setTracks] = useState([]);
  const [errors, setErrors] = useState([]);
  const [addSongSnackOpen, setAddSongSnackOpen] = useState({
    severity: null,
    bool: false
  });

  // sets the playlist from the id in the url
  useEffect(() => {
    if (params.id.length < 20) {
      let thisPagesPlaylist = localUser.playlists.find((playlist) => {
        if (playlist.id.toString() === params.id) {
          return playlist
        } else {}
      })
      setCurrentPlaylist(thisPagesPlaylist)
    }
  }, [params, localUser]);

  // adds track to currentplaylist then updates state with the updated playlist from the backend
  function handleAddTrack(track, e) {
    e.preventDefault()
    let songGenre = track.album.genres === null ? null : track.album.genres[0]
    fetch(`/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spotify_id: track.id,
        spotify_album_id: track.album.id,
        playlist_id: currentPlaylist.id,
        spotify_artist_id: track.artists[0].id,
        featured_artist: track.artists[0].name,
        release_date: track.album.release_date,
        name: track.name,
        genre: songGenre,
        preview_url: track.preview_url,
        cover_art: track.album.images[0].url,
      })
    }).then((res) => {
      if (res.ok) {
        res.json().then((newSong) => {
          let updatedPlaylists = localUser.playlists.map((pl) => {
            if (params.id === pl.id.toString()) {
              pl.songs.push(newSong)
              return pl
            } else {
              return pl
            }
          })
          setLocalUser({ ...localUser, playlists: updatedPlaylists })
          setAddSongSnackOpen({ severity: true, bool: true })
          addSongMessage.current = `${newSong.name} has been successfully to your playlist!`
        });
      } else {
        res.json().then((err) => {
          setAddSongSnackOpen({ severity: false, bool: true })
          addSongMessage.current = err.error[0]
        })
      };
    });
  };

  // removes a track from the currentplaylist
  function handleDeleteTrack(song, e) {
    e.preventDefault()
    fetch(`/songs/${song.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      if (res.ok) {
        let updatedPlaylists = localUser.playlists.map((pl) => {
          if (params.id === pl.id.toString()) {
            pl.songs = pl.songs.filter((ele) => ele.id !== song.id)
            return pl
          } else {
            return pl
          }
        })
        setLocalUser({ ...localUser, playlists: updatedPlaylists })
        let updatedSongs = currentPlaylist.songs.filter((ele) => ele.id !== song.id)
        setCurrentPlaylist({ ...currentPlaylist, songs: updatedSongs })
      } else {
        res.json().then((err) => setErrors(err.error))
      }
    })
  };

  function handleSearchSubmit(e) {
    e.preventDefault()
    let toSearch = search.length > 0 ? search : 'blank'
    fetch(`/spotify_api/songs/${toSearch}`)
      .then((res) => {
        if (res.ok) {
          res.json().then((tracks) => {
            setTracks(tracks)
          })
        } else {
          res.json().then((err) => {
            setErrors(err.error)
          });
        }
      })
    setSearch('')
  };

  function handleSearchInputChange(e) {
    setSearch(e.target.value)
  };

  return (
    <>
      <PlaylistInfo />

      <div className='errordiv' style={{ marginLeft: '10em' }}>
        {errors.map((error) => {
          return <p key={error} className='error'>{error}</p>;
        })}
      </div>

      <div style={{ marginBottom: '30px' }} >
        {currentPlaylist.songs ?
          currentPlaylist.songs.map((song) => {
            return (
              <PlaylistSongRow
                key={song.spotify_id}
                song={song}
                queue={currentPlaylist.songs}
                handleDeleteTrack={handleDeleteTrack}
              />
            )
          })
          :
          <></>
        }
      </div>
      <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '20px' }} />

      <Grid container>
        <Grid item>
          <Paper
            component="form"
            onSubmit={(e) => handleSearchSubmit(e)}
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 450,
              marginLeft: '2em',
              marginBottom: '8em',
              backgroundColor: 'grey'
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for Songs, Artists or Albums"
              type='text'
              name='search'
              value={search}
              onChange={handleSearchInputChange}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={(e) => handleSearchSubmit(e)}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>

      <div style={{ marginTop: '-120px', marginBottom: '125px' }}>
        {tracks.length > 0 ?
          tracks.map((track) => {
            return (
              <SongRow
                track={track}
                key={track.id}
                handleAddTrack={handleAddTrack}
                queue={tracks}
              />
            )
          })
          :
          null
        }
      </div>

      <Snackbar open={addSongSnackOpen.bool} autoHideDuration={5000} onClose={handleSnackClose}>
        <Alert
          onClose={handleSnackClose}
          severity={addSongSnackOpen.severity ? "success" : "error"}
          sx={{ width: '100%' }}
        >
          {addSongSnackOpen.bool ?
            `${addSongMessage.current}`
            :
            ''
          }
        </Alert>
      </Snackbar>
    </>
  )
}

export default Playlist;