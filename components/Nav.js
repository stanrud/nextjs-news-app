import * as React from 'react'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Image from 'next/image'

const logo = require('src/assets/images/logo.png')

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar
      position='static'
      color='transparent'
      className='shadow-md'
    >
      <Container maxWidth='md'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            className='hidden md:flex mr-2'
          >
            <Image
              src={logo}
              alt='Logo'
              width={40}
              height={40}
            />
          </Typography>
          <Box
            className='grow xs:flex md:hidden'
          >
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className='md:hidden block'
            >
              <Link href='/' exact className='nav-item nav-link'>
                <a>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>Home</Typography>
                  </MenuItem>
                </a>
              </Link>
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            className='grow md:hidden xs:flex'
          >
            <Image
              src={logo}
              alt='Logo'
              width={40}
              height={40}
            />
          </Typography>
          <Box className='grow md:flex hidden'>
            <Link
              href='/'
              exact
              className='nav-item nav-link'
            >
              <a>
                <Button
                  onClick={handleCloseNavMenu}
                  style={{ color: '#343434' }}
                >
                  Home
                </Button>
              </a>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar