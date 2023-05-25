import React, { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from 'react-router-dom'

import { Avatar } from "@mui/material"
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'

function Header() {
  const [search, setSearch] = useState("")
  const [errors, setErrors] = useState([])

  const navigate = useNavigate()

  const { localUser, setLocalUser, setIsAuthenticated, setMainSearch, setCurrentTrack } = useContext(UserContext)

  function handleChange(e) {
    setSearch(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setMainSearch(search)
    setSearch('')
    navigate("/search")
  }

  function handleLogout() {
    fetch("/logout",
      { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setLocalUser({})
          setIsAuthenticated(false)
          setCurrentTrack()
        }
        setAnchorEl(null)
      })
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null)
  };

  function handleMyProfile() {
    navigate('/profile')
    setAnchorEl(null)
  };

  return (
    <div className='Header'>
      <div className='header__left'>
        <form onSubmit={handleSubmit}>
          <Paper
            elevation={0}
            sx={{ display: 'flex', alignItems: 'center', width: 500 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for Songs, Artists or Albums"
              type='text'
              name='search'
              value={search}
              onChange={handleChange}
            />
            <IconButton
              type="button"
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={(e) => handleSubmit(e)}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </form>
      </div>

      <div className='errordiv' style={{ marginLeft: '10em' }}>
        {errors.map((error) => {
          return <p key={error} className='error'>{error}</p>
        })}
      </div>

      <div className='header__right'>
        <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ textTransform: 'none' }}
        >
          <Avatar
            className="Avatar"
            src={localUser.avatar_url}
          />
          {localUser.username}
        </Button>
        <Menu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleMyProfile} disableRipple>
            <AccountBoxIcon />
            My Profile
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleLogout} disableRipple>
            Log out
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header