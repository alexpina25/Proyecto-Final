import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Button,
  VStack,
  Heading,
  Box,
  Image,
} from '@chakra-ui/react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import useRegister from '../../hooks/useRegister';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const RegisterForm = () => {
  const { register: registerUser, handleSubmit } = useForm();
  const {
    isLoading,
    previewImage,
    handleImageChange,
    register: submitRegistration,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  
  return (
    <Stack w={'full'} spacing={4}>
      <Heading fontSize={'2xl'} textAlign={'center'}>
        Regístrate
      </Heading>
      <form onSubmit={handleSubmit(submitRegistration)}>
        <InputGroup mt={4}>
          <Input
            isRequired
            {...registerUser('name')}
            placeholder="Nombre de usuario"
          />
        </InputGroup>

        <InputGroup mt={4}>
          <InputLeftAddon children="+34" />
          <Input
            isRequired
            {...registerUser('telefono')}
            placeholder="Teléfono"
          />
        </InputGroup>

        <InputGroup mt={4}>
          <Input isRequired {...registerUser('email')} placeholder="Email" />
        </InputGroup>

        <InputGroup mt={4}>
          <Input
            isRequired
            {...registerUser('password')}
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
          />
          <InputRightElement mr={4}>
            <Button
              h="2rem"
              size="sm"
              onClick={handlePasswordVisibility}
              bg={'primary'}
              color={'blanco'}
            >
              {showPassword ? (
                <ViewOffIcon></ViewOffIcon>
              ) : (
                <ViewIcon></ViewIcon>
              )}
            </Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup mt={4}>
          <Input
            type="file"
            {...registerUser('image')}
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <Button as="span">Subir imagen de usuario</Button>
          </label>
        </InputGroup>

        <Box
          mt={4}
          width="100px"
          height="100px"
          position="relative"
          borderRadius="full"
          overflow="hidden"
        >
          <Image
            width="100%"
            height="100%"
            objectFit="cover"
            src={
              previewImage ||
              'https://pic.onlinewebfonts.com/svg/img_181369.png'
            }
            alt="Preview"
          />
        </Box>

        <Button
          mt={4}
          type="submit"
          variant="solid"
          colorScheme="blue"
          isLoading={isLoading}
          loadingText="Registrando usuario..."
        >
          Registrarme
        </Button>
      </form>

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
    </Stack>
  );
};

export default RegisterForm;
