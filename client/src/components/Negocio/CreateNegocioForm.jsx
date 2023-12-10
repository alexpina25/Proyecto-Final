import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Progress,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import InfoStep from './CreateNegocioSteps/InfoStep';
import UbicacionStep from './CreateNegocioSteps/UbicacionStep';
import CategoriesStep from './CreateNegocioSteps/CategoriesStep';
import HorarioStep from './CreateNegocioSteps/HorarioStep';

const CreateNegocioForm = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    'Información Básica',
    'Ubicación',
    'Categoría y Descripción',
    'Horario',
  ];
  const totalSteps = steps.length;
  const defaultHorario = [
    {
      dia: 'Lunes',
      abierto: true,
      horarioPartido: false,
      abreManana: '10:00',
      cierraManana: '14:00',
      abreTarde: '16:00',
      cierraTarde: '20:00',
    },
    {
      dia: 'Martes',
      abierto: true,
      horarioPartido: false,
      abreManana: '10:00',
      cierraManana: '14:00',
      abreTarde: '16:00',
      cierraTarde: '20:00',
    },
    {
      dia: 'Miércoles',
      abierto: true,
      horarioPartido: false,
      abreManana: '10:00',
      cierraManana: '14:00',
      abreTarde: '16:00',
      cierraTarde: '20:00',
    },
    {
      dia: 'Jueves',
      abierto: true,
      horarioPartido: false,
      abreManana: '10:00',
      cierraManana: '14:00',
      abreTarde: '16:00',
      cierraTarde: '20:00',
    },
    {
      dia: 'Viernes',
      abierto: true,
      horarioPartido: false,
      abreManana: '10:00',
      cierraManana: '14:00',
      abreTarde: '16:00',
      cierraTarde: '20:00',
    },
    {
      dia: 'Sábado',
      abierto: false,
      horarioPartido: false,
      abreManana: '10:00',
      cierraManana: '14:00',
      abreTarde: '16:00',
      cierraTarde: '20:00',
    },
    {
      dia: 'Domingo',
      abierto: false,
      horarioPartido: false,
      abreManana: '10:00',
      cierraManana: '14:00',
      abreTarde: '16:00',
      cierraTarde: '20:00',
    },
  ];

  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email_negocio: '',
    ubicacion: {
      calle: '',
      ciudad: '',
      provincia: '',
      codigoPostal: '',
      pais: '',
      lat: 0,
      lng: 0,
    },
    categorias: [],
    descripcion: '',
    imagenes: [],
  });
  // Configuración de useForm
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: { ...formData, horario: defaultHorario },
  });

  const watchedFormData = watch();
  useState(() => {
    setFormData(watchedFormData);
  }, [watchedFormData]);

  // Manejador para el envío del formulario
  const onSubmitForm = (data) => {
    onSubmit(data);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <InfoStep control={control} errors={errors} />;
      case 1:
        return <UbicacionStep control={control} errors={errors} />;
      case 2:
        return (
          <CategoriesStep
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        );
      case 3:
        return <HorarioStep control={control} errors={errors} watch={watch} />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Flex align="center" justify="space-between" w="full">
        <IconButton
          icon={<ArrowBackIcon />}
          onClick={goToPreviousStep}
          isDisabled={currentStep === 0}
          mr={'auto'}
        />
        <Text flex="1" mr={12} textAlign="center">
          {steps[currentStep]}
        </Text>
      </Flex>
      <Progress
        hasStripe
        size="sm"
        colorScheme="green"
        value={(currentStep / totalSteps) * 100}
        mb="4"
      />

      {renderStepContent(currentStep)}

      <Box textAlign="center" marginTop="20px">
        {currentStep < totalSteps - 1 && (
          <Button bg={'primary'} color={'white'} onClick={goToNextStep}>
            Siguiente
          </Button>
        )}
        {currentStep === totalSteps - 1 && (
          <Button bg={'green'} color={'blanco'} type="submit">
            Registrar Negocio
          </Button>
        )}
      </Box>
    </form>
  );
};

export default CreateNegocioForm;
