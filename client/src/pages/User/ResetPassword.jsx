import React from 'react';
import { Box, Flex, Input, Button, Heading, useToast } from '@chakra-ui/react';

import Navbar from '@/components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import useResetPassword from '../../hooks/User/useResetPassword';

const ResetPasswordPage = () => {
  const {
    password,
    confirmPassword,
    isLoading,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  } = useResetPassword();

  const toast = useToast();

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
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Heading as="h2" size="md" textAlign={'center'} mb={4}>
            Restablecer la contraseña
          </Heading>
          <form
            onSubmit={handleSubmit}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Input
              variant="outline"
              isRequired
              size="md"
              id="password"
              placeholder="Nueva Contraseña"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Input
              variant="outline"
              mt={4}
              isRequired
              size="md"
              id="confirmPassword"
              placeholder="Confirmar Contraseña"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <Button
              mt={4}
              type="submit"
              variant="solid"
              colorScheme="blue"
              isLoading={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Cambiar contraseña'}
            </Button>
          </form>
        </Box>
      </Flex>

      <Footer />
    </>
  );
};

export default ResetPasswordPage;
