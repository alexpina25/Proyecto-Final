import React from 'react';
import { Box } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import StepperForm from '../common/StepperForm';
import InfoStep from '../Negocio/CreateNegocioSteps/InfoStep';
import UbicacionStep from './CreateNegocioSteps/UbicacionStep';
import CategoriesStep from './CreateNegocioSteps/CategoriesStep';
import HorarioStep from './CreateNegocioSteps/HorarioStep';
import DetalleStep from './CreateNegocioSteps/DetalleStep';

const CreateNegocioForm = ({ onSubmit }) => {
  const steps = [
    {
      title: 'Información Básica',
      description: 'Nombre, teléfono y email del negocio',
    },
    { title: 'Ubicación', description: 'Detalles de ubicación del negocio' },
    {
      title: 'Categoría y Descripción',
      description: 'Categoría y descripción del negocio',
    },
    { title: 'Horario', description: 'Horario de operación del negocio' },
    { title: 'Detalles', description: 'Datos del negocio' },
  ];

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      //* INFORMACIÓN BÁSICA
      case 0:
        return <InfoStep control={control} errors={errors} />;
      //* UBICACIÓN
      case 1:
        return <UbicacionStep></UbicacionStep>;

      //* CATEGORÍA Y DESCRIPCIÓN
      case 2:
        return (
          <CategoriesStep
            control={control}
            setValue={setValue}
            errors={errors}
          />
        );

      //* HORARIO
      case 3:
        return (
          <HorarioStep
            control={control}
            setValue={setValue}
            errors={errors}
          ></HorarioStep>
        );

      //* DETALLES Y CONFIRMACIÓN
      case 4:
        return (
          <Box>
            <DetalleStep
              control={control}
              errors={errors}
              formData={getValues()}
            />
          </Box>
        );
      default:
        return 'Paso no encontrado';
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepperForm
        steps={steps}
        stepContent={renderStepContent}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </form>
  );
  l;
};

export default CreateNegocioForm;
