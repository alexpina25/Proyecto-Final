import React from 'react';
import { Box, Text, Wrap, Badge } from '@chakra-ui/react';

const DetalleStep = ({ control, errors, formData }) => {
  console.log('formData', formData);
  return (
    <Box>
      {/* Datos del InfoStep */}
      <Text mt={2}>Nombre del negocio: {formData.nombre}</Text>
      <Text mt={2}>Teléfono: {formData.telefono}</Text>
      <Text mt={2}>Email del negocio: {formData.email_negocio}</Text>

      {/* Datos de UbicacionStep */}
      <Text fontWeight="bold" mt={4}>
        Ubicación:
      </Text>
      <Text mt={2}>Calle: {formData.calle}</Text>
      <Text mt={2}>Detalle (Local, edificio, etc): {formData.detalle}</Text>
      <Text mt={2}>Ciudad: {formData.ciudad}</Text>
      <Text mt={2}>Provincia: {formData.provincia}</Text>
      <Text mt={2}>Código postal: {formData.codigoPostal}</Text>
      <Text mt={2}>País: {formData.pais}</Text>

      {/* Datos de CategoriesStep */}
      <Text fontWeight="bold" mt={4}>
        Categorías:
      </Text>
      <Wrap mt={2}>
        {formData.categorias &&
          formData.categorias.map((category, index) => (
            <Badge key={index} m={1}>
              {category}
            </Badge>
          ))}
      </Wrap>
      <Text fontWeight="bold" mt={4}>
        Descripción:
      </Text>
      <Text mt={2}>{formData.descripcion}</Text>

      {/* Datos de HorarioStep */}
      <Text fontWeight="bold" mt={4}>
        Horario:
      </Text>
      {formData.horarios &&
        formData.horarios.map((horario, index) => (
          <Box mt={2} key={index}>
            <Text>
              {horario.dia}:{' '}
              {horario.abierto
                ? `${horario.abreMañana} - ${horario.cierraMañana}` +
                  (horario.cerradoMediodia
                    ? `, ${horario.abreTarde} - ${horario.cierraTarde}`
                    : '')
                : 'Cerrado'}
            </Text>
          </Box>
        ))}
    </Box>
  );
};

export default DetalleStep;
