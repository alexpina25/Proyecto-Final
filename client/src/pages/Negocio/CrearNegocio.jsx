import React, { useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CreateNegocioForm from '../../components/Negocio/CreateNegocioForm';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { createNegocio } from '../../services/negocio.service';
import { useAuth } from '../../context/authContext'; // Asegúrate de que la ruta sea correcta

const CreateNegocioPage = () => {
  const { user } = useAuth();

console.log(user);

  const handleFormSubmit = async (data) => {
    if (user && user._id) {
      // Asegúrate de que user y user._id existen
      const formDataConOwner = {
        ...data,
        owner: user._id,
      };

      try {
        const response = await createNegocio(formDataConOwner);
        console.log('Respuesta del servidor:', response);
        // Manejar la respuesta del servidor aquí
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        // Manejar errores aquí
      }
    } else {
      // Manejar el caso en que el ID del usuario no esté disponible
      console.error('Error: ID del usuario no disponible');
    }
  };

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
          w={{ base: '90%', sm: '80%', md: '60%', lg: '90%' }}
        >
          <CreateNegocioForm onSubmit={handleFormSubmit} />
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default CreateNegocioPage;
