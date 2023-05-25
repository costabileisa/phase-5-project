import React, { useContext } from "react"
import { UserContext } from "../context/UserContext"

import Grid from '@mui/material/Grid'

function Profile() {
  const { localUser } = useContext(UserContext)

  return (
    <>
      <Grid container className='body'>
        <Grid item xs={4} sx={{}}>
          <img className="profile_image_class" src={localUser.avatar_url} alt={localUser.username} />
        </Grid>
        <Grid item xs={8} className="body__infoText" >
          <p>{`Username: ${localUser.username}`}</p>
          <p>{`Birthdate: ${localUser.birthdate}`}</p>
          <p>{`Region: ${localUser.region}`}</p>
          <p>{`Email: ${localUser.email}`}</p>
        </Grid>
      </Grid>

        <Grid container className='body'>

        {localUser.spotify_token ? 
          <>
            <Grid item>
              <img className="profile_image_class" src={localUser.spotify_img} alt={`${localUser.username}'s avatar unavailable`} />
            </Grid>
            <Grid item className="body__infoText" >
              <h4>Spotify account details:</h4>
              <p>{`Spotify display name: ${localUser.spotify_display_name}`}</p>
              <p>{`Spotify Id: ${localUser.spotify_id}`}</p>
              <p>{`Spotify email: ${localUser.spotify_email}`}</p>
            </Grid>
          </>
        :
        <p>Login with Spotify using the link in the nav bar.</p>
        }
        </Grid>
        </>
  )
}

export default Profile