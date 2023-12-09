import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Button,
} from '@chakra-ui/react';
import InfoStep from './CreateNegocioSteps/InfoStep';
import UbicacionStep from './CreateNegocioSteps/UbicacionStep';
import CategoriesStep from './CreateNegocioSteps/CategoriesStep';
import HorarioStep from './CreateNegocioSteps/HorarioStep';

const CreateNegocioForm = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      nombre: '',
      telefono: '',
      email_negocio: '',
      direccion: '',
      ciudad: '',
      provincia: '',
      codigo_postal: '',
      categoria: '',
      descripcion: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Tabs isFitted isLazy variant="soft-rounded">
        <TabList mb="1em" overflow="auto">
          <Tab>Información Básica</Tab>
          <Tab>Ubicación</Tab>
          <Tab>Categoría y Descripción</Tab>
          <Tab>Horario</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <InfoStep control={control} errors={errors} />
          </TabPanel>
          <TabPanel>
            <UbicacionStep control={control} errors={errors} />
          </TabPanel>
          <TabPanel>
            <CategoriesStep control={control} errors={errors} />
          </TabPanel>
          <TabPanel>
            <HorarioStep control={control} errors={errors} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box textAlign="center" marginTop="20px">
        <Button colorScheme="blue" type="submit">
          Registrar Negocio
        </Button>
      </Box>
    </form>
  );
};

export default CreateNegocioForm;
