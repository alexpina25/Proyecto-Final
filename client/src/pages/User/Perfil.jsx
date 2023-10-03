import React, { useState, useEffect } from 'react';
import { Box, Flex, Stack, Avatar, Heading, Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import useUpdate from '../../hooks/useUpdate';
import EditableField from '../../components/common/EditableField';
import NavBar from './../../components/layout/Navbar';
import Footer from './../../components/layout/Footer';

const UserProfile = () => {
  const { user, errors, handleSave } = useUpdate();
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState({ ...user });

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    const success = await handleSave(localUser);
    if (success) {
      setIsEditing(false);
    } else {
      // Si hay un error, vuelva a cargar los datos del usuario
      setLocalUser(user);
    }
  };

  return (
    <>
      <NavBar />
      <Flex
        paddingTop={'10vh'}
        paddingBottom={'10vh'}
        direction="column"
        align="center"
        justify="center"
        bg={"primary"}
      >
        <Box
          p={4}
          borderWidth={1}
          borderRadius="lg"
          mx={{ base: 4, md: 4 }}
          w={{ base: '90%', sm: '80%', md: '60%', lg: '40%' }}
          bg={"blanco"}
        >
          <Stack spacing={6} alignItems={'center'}>
            <Heading fontSize={'2xl'} textAlign={'center'}>
              Perfil de Usuario
            </Heading>
            <Avatar src={user.image} boxSize={125}>
              <EditIcon color={'black'} />
            </Avatar>
            {['name', 'email', 'telefono'].map((field) => (
              <EditableField
                key={field}
                label={field}
                value={localUser[field]}
                isInvalid={errors[field]}
                isEditing={isEditing}
                onEdit={(newValue) =>
                  setLocalUser({ ...localUser, [field]: newValue })
                }
              />
            ))}
            <Button bg={"primary"} color={"blanco"} onClick={isEditing ? handleSaveClick : handleEditClick}>
              {isEditing ? 'Guardar' : 'Editar'}
            </Button>
          </Stack>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default UserProfile;
