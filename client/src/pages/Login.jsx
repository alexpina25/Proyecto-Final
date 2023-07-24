import React from "react";
import LoginForm from "../components/LoginForm";
import { Box, Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding={2}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Log In
      </Typography>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;