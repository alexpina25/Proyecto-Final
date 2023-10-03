import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CreateNegocioForm from '../../components/Negocio/CreateNegocioForm';
import { Box, Flex, Heading } from '@chakra-ui/react';

const CreateNegocioPage = () => {
  const handleFormSubmit = (data) => {
    // Lógica para enviar los datos al servidor
    console.log('Datos del formulario:', data);
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
          <CreateNegocioForm onSubmit={{ handleFormSubmit }} />
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default CreateNegocioPage;
