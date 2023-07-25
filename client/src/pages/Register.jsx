import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Box, Typography } from "@mui/material";

const RegisterPage = () => {
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
        Sign Up
      </Typography>
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;