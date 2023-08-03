import React from 'react';
import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  Button,
} from '@mui/material';
import { AccountCircle, ExitToApp, Menu } from '@mui/icons-material';

const NavItem = ({ to, text, icon, onClick }) => (
  <ListItem button component={Link} to={to} onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

const NavList = ({ isMobile, user, logout }) => {
  const items = user
    ? [
        { to: '/perfil', text: 'Perfil', icon: <AccountCircle /> },
        { to: '/', text: 'Logout', icon: <ExitToApp />, onClick: logout },
      ]
    : [
        { to: '/login', text: 'Login', icon: <AccountCircle /> },
        { to: '/register', text: 'Register', icon: <ExitToApp /> },
      ];

  return (
    <List
      style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}
    >
      {items.map((item, index) => (
        <NavItem key={index} {...item} />
      ))}
    </List>
  );
};

const NavBar = () => {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            RESERVAL
          </Link>
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <Menu />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <NavList isMobile={isMobile} user={user} logout={handleLogout} />
            </Drawer>
          </>
        ) : (
          <NavList isMobile={isMobile} user={user} logout={handleLogout} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
