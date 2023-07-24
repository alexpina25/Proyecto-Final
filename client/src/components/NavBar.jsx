import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Button, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme, Box } from '@mui/material';
import { AccountCircle, Settings, ExitToApp, Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => {
    const textList = user ? ['Perfil', 'Settings', 'Logout'] : ['Login', 'Register'];
    const linkList = user ? ['/perfil', '/settings', '/'] : ['/login', '/register'];
    const iconList = user ? [<AccountCircle />, <Settings />, <ExitToApp />] : [<AccountCircle />, <ExitToApp />];
    return (

      <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
         <List style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
          {textList.map((text, index) => (
            <ListItem button key={text} component={Link} to={linkList[index]} onClick={index === 2 && user ? logout : null}>
              <ListItemIcon>
                {iconList[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    )
  };

  return (
    <AppBar position="static">

      <Toolbar>
      <Button variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>RESERVAL</Link>
        </Button>

        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <Menu />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
          </>
        ) : (
          <>
            {list()}
            </>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default NavBar;