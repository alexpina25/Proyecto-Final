import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

const InfoStep = ({ control, errors }) => {
  return (
    <Box>
      {/* Campo para el nombre del negocio */}
      <FormControl isInvalid={errors.nombre}>
        <FormLabel htmlFor="nombre">Nombre del Negocio</FormLabel>
        <Controller
          control={control}
          name="nombre"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              id="nombre"
              placeholder="Ingrese el nombre del negocio"
              onChange={onChange}
              onBlur={onBlur}
              value={value ? value : ''}
              ref={ref}
            />
          )}
        />
        <FormErrorMessage>
          {errors.nombre && errors.nombre.message}
        </FormErrorMessage>
      </FormControl>

      {/* Campo para el teléfono */}
      <FormControl isInvalid={errors.telefono} mt={4}>
        <FormLabel htmlFor="telefono">Teléfono</FormLabel>
        <Controller
          control={control}
          name="telefono"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              id="telefono"
              placeholder="Ingrese el teléfono del negocio"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
            />
          )}
        />
        <FormErrorMessage>
          {errors.telefono && errors.telefono.message}
        </FormErrorMessage>
      </FormControl>

      {/* Campo para el email del negocio */}
      <FormControl isInvalid={errors.email_negocio} mt={4}>
        <FormLabel htmlFor="email_negocio">Email del Negocio</FormLabel>
        <Controller
          control={control}
          name="email_negocio"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              required
              id="email_negocio"
              type="email"
              placeholder="Ingrese el email del negocio"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
            />
          )}
        />
        <FormErrorMessage>
          {errors.email_negocio && errors.email_negocio.message}
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default InfoStep;
