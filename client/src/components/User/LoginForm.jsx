import React, { useState } from 'react';
import {
  Input,
  Button,
  Link,
  Box,
  Stack,
  VStack,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useLogin } from '@/hooks/User/useLogin';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@chakra-ui/react';
import useForgotPassword from './../../hooks/User/useForgotPassword';
import { useResendCode } from '../../hooks/User/useResendCode';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const { login, status } = useLogin();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { email, setEmail, isLoading, handleForgotPassword } =
    useForgotPassword(onOpen, onClose);

  const { isLoading: isResendLoading, timer, resendCode } = useResendCode();

  const toast = useToast();
  const {
    isOpen: isValidationModalOpen,
    onOpen: onValidationModalOpen,
    onClose: onValidationModalClose,
  } = useDisclosure();

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(loginData);
    if (result) {
      if (
        result.status === 'error' &&
        result.message.includes('El correo electrónico no ha sido validado')
      ) {
        // Mostrar modal de correo no validado
        onValidationModalOpen();
      } else {
        // Mostrar toast con result.title y result.message
        toast({
          title: result.title,
          description: result.message,
          status: result.status,
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleResendCode = () => {
    resendCode({ email: loginData.email });
  };

  return (
    <>
      <Box w="full">
        <Heading as="h2" size="md" textAlign={'center'}>
          Inicia sesión
        </Heading>
        <form onSubmit={handleSubmit}>
          <Input
            variant="outline"
            mt={4}
            isRequired
            size="md"
            id="email"
            placeholder="E-mail"
            name="email"
            autoComplete="email"
            value={loginData.email}
            onChange={handleInputChange}
          />
          <Input
            variant="outline"
            mt={4}
            mb={2}
            isRequired
            size="md"
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={handleInputChange}
          />

          <Link onClick={onOpen} textDecor={'underline'} fontSize={'sm'}>
            Olvidé mi contraseña
          </Link>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={4}
            mt={4}
            justify={'space-around'}
          >
            <Button
              type="submit"
              variant="solid"
              colorScheme="blue"
              isLoading={status === 'loading'}
              loadingText="Cargando..."
            >
              Iniciar sesión
            </Button>

            <Button
              variant="outline"
              colorScheme="blue"
              onClick={() => navigate('/register')}
            >
              Regístrate
            </Button>

            {/* Modal para validar correo */}
            <Modal
              isOpen={isValidationModalOpen}
              onClose={onValidationModalClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader color={'crimson'}>Error</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Tu correo electrónico aún no ha sido validado. Por favor,
                  verifica tu correo y sigue el enlace de verificación.
                  {timer > 0 && (
                    <p>
                      Tiempo restante para reenviar el código: {timer} segundos.
                    </p>
                  )}
                </ModalBody>
                <ModalFooter gap={4}>
                  <Button
                    bg={'verde'}
                    onClick={handleResendCode}
                    isLoading={isResendLoading}
                    disabled={timer > 0}
                  >
                    Reenviar código
                  </Button>
                  <Button bg={'blanco'} onClick={onValidationModalClose}>
                    Entendido
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* Modal para restablecer contraseña */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Restablecer la contraseña</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input
                    type="email"
                    placeholder="Ingresa tu correo electrónico aquí"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </ModalBody>

                <ModalFooter>
                  <Button variant="ghost" onClick={onClose} mr={3}>
                    Cancelar
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={handleForgotPassword}
                    isLoading={isLoading}
                  >
                    Enviar correo
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Stack>
        </form>
      </Box>
      <VStack mt={4} spacing={4}>
        <Heading as="h2" size="md">
          O entra con:
        </Heading>
        <Button
          leftIcon={<FaGoogle />}
          colorScheme="red"
          variant="outline"
          width="full"
        >
          Google
        </Button>
        <Button
          leftIcon={<FaFacebook />}
          colorScheme="blue"
          variant="outline"
          width="full"
        >
          Facebook
        </Button>
      </VStack>
    </>
  );
};

export default LoginForm;
