import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import Navbar from '../../components/layout/Navbar';
import LoginForm from '../../components/User/LoginForm';
import Footer from '../../components/layout/Footer';

const LoginPage = () => {
  return (
    <>
      <Navbar />

      <Flex
        bg={'primary'}
        paddingTop={'10vh'}
        paddingBottom={'10vh'}
        direction="column"
        align="center"
        justify="center"
      >
        <Box
          p={4}
          borderWidth={1}
          borderRadius="lg"
          bg={'blanco'}
          mx={{ base: 4, md: 4 }}
          w={{ base: '90%', sm: '80%', md: '60%', lg: '40%' }}
        >
          <LoginForm />
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default LoginPage;
