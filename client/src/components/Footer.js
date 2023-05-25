import React, { useContext } from "react"
import { UserContext } from "../context/UserContext"

import { Grid } from "@mui/material";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

function Footer() {
  const { currentTrack, setCurrentTrack, currentQueue, playState, setPlayState } = useContext(UserContext);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  console.log("inside footer")
  return (
    <div className="Footer">
      {currentTrack ?
        <>
          <img
            className="footer__albumLogo"
            src={currentTrack.album ? currentTrack.album.image_url ? currentTrack.album.image_url : currentTrack.album.images[0].url : currentTrack.cover_art}
            alt={currentTrack.album ? currentTrack.album.name : currentTrack.name} /><div className='footer__songInfo'>
            <h4>{currentTrack.name}</h4>
            <p>{currentTrack.featured_artist ? currentTrack.featured_artist : currentTrack.artists[0].name}</p>
          </div>
        </>
        :
        <p>Choose a song!</p>
      }
      <div className='footer__center'>
        {shuffle ?
          <ShuffleOnIcon className='footer__green' onClick={() => handleShuffle()} />
          :
          <ShuffleIcon className='footer__green' onClick={() => handleShuffle()} />
        }
        <SkipPreviousIcon className='footer__icon' onClick={prevSong} />
        <SkipNextIcon className='footer__icon' onClick={nextSong} />
        {repeat ?
          <RepeatOnIcon className='footer__green' onClick={() => handleRepeat()} />
          :
          <RepeatIcon className='footer__green' onClick={() => handleRepeat()} />
        }
      </div>
      <div className='footer__right'>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Footer