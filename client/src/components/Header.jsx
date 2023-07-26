import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Nombre de tu Aplicación
        </Typography>
        <Button color="inherit" href="/login">
          Login
        </Button>
        <Button color="inherit" href="/register">
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
