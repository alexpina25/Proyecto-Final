import React, { useState, useEffect } from 'react';
import {
  Stack,
  PinInput,
  PinInputField,
  Button,
  Heading,
  Box,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { checkCodeConfirmationUser } from '../../services/user.service';
import { handleCheckCodeResponse } from '../../helpers/handleCheckCodeResponse';
import { useResendCode } from '../../hooks/User/useResendCode';
import { useToast } from '@chakra-ui/react';
import NavBar from './../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const CheckCode = () => {
  const [code, setCode] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { isResending, timer, resendCode } = useResendCode(token);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (code.length === 6) {
      verify();
    }
  }, [code]); // Ejecuta el useEffect cada vez que 'code' cambie

  const verify = async (event) => {
    event?.preventDefault();
    const response = await checkCodeConfirmationUser(token, Number(code));

    if (response.error) {
      toast({
        title: 'Error',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      return; // Finaliza la función aquí
    }

    const result = handleCheckCodeResponse(response);
    if (result) {
      toast({
        title: result.title,
        description: result.message,
        status: result.status,
        duration: result.status === 'success' ? 1500 : 5000,
        isClosable: true,
        position: 'top-right',
      });
    }

    if (response?.status === 200) {
      navigate('/login');
    }
  };

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
      >
        <Box
          p={4}
          borderWidth={1}
          borderRadius="lg"
          bg={'blanco'}
          mx={{ base: 4, md: 4 }}
          w={{ base: '90%', sm: '80%', md: '60%', lg: '40%' }}
        >
          <Stack spacing={6} alignItems={'center'}>
            <Heading fontSize={'2xl'} textAlign={'center'}>
              Verificar Código
            </Heading>
            <form onSubmit={verify}>
              <PinInput
                size="sm"
                value={code}
                onChange={setCode}
                focusBorderColor="blue.500"
                type="numeric"
                placeholder="-"
                autoComplete="off"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <PinInputField mr={2} />
                <PinInputField mr={2} />
                <PinInputField mr={2} />
                <PinInputField mr={2} />
                <PinInputField mr={2} />
                <PinInputField />
              </PinInput>

              <HStack justifyContent={'center'} mt={4}>
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
                  isLoading={isLoading}
                  loadingText="Verificando código..."
                >
                  Verificar
                </Button>
              </HStack>
            </form>
            <Button
              onClick={() => resendCode({ token: token })}
              isLoading={isResending}
              disabled={timer > 0}
              colorScheme="red"
            >
              {timer > 0 ? `Espera ${timer} segundos` : 'Reenviar Código'}
            </Button>
          </Stack>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default CheckCode;
