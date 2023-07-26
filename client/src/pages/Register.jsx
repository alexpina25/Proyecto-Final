import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Box, Typography, Container } from "@mui/material";

const RegisterPage = () => {
  return (
    <Box textAlign={'center'} paddingLeft={'15%'} paddingRight={'15%'}>
      <Typography variant="h4" component="h1" gutterBottom mt={'20px'}>
        Sign Up
      </Typography>
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;