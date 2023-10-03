import React from 'react';
import RegisterForm from '../../components/User/RegisterForm';
import { Box, Flex } from '@chakra-ui/react';
import NavBar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const RegisterPage = () => {
  return (
    <>
      <NavBar />

      <Flex
        bg={'primary'}
        paddingTop={'10vh'}
        paddingBottom={'10vh'}
        direction="column"
        align="center"
        justify="center"
        flex="1"
      >
        <Box
          p={4}
          borderWidth={1}
          borderRadius="lg"
          bg={'blanco'}
          mx={{ base: 4, md: 4 }}
          w={{ base: '90%', sm: '80%', md: '60%', lg: '40%' }}
        >
          <RegisterForm />
        </Box>
      </Flex>

      <Footer />
    </>
  );
};

export default RegisterPage;
