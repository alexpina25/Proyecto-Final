import React from 'react';
import {
  Box,
  Stack,
  Flex,
  FormLabel,
  Switch,
  Select,
  Checkbox,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

const HorarioStep = ({ control, watch }) => {
  const diasDeLaSemana = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  const horarios = watch('horario');

  const generarOpcionesDeTiempo = (horaInicio = 0, horaFin = 24) => {
    let opciones = [];
    for (let hora = horaInicio; hora < horaFin; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 15) {
        let horaFormateada = `${hora.toString().padStart(2, '0')}:${minuto
          .toString()
          .padStart(2, '0')}`;
        opciones.push(
          <option key={horaFormateada} value={horaFormateada}>
            {horaFormateada}
          </option>,
        );
      }
    }
    return opciones;
  };

  return (
    <Box>
      <Stack spacing={4}>
        {horarios.map((horario, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
            <Flex alignItems="center" justifyContent="start" gap="20px">
              <Controller
                name={`horario[${index}].abierto`}
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    colorScheme="green"
                    defaultChecked={index < 5}
                  />
                )}
              />
              <FormLabel>{horario.dia}</FormLabel>
              {horario.abierto && (
                <Flex alignItems="center" ml={4}>
                  <Controller
                    name={`horario[${index}].horarioPartido`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} borderColor="gray.500" />
                    )}
                  />
                  <Text ml={2}>Horario Partido</Text>
                </Flex>
              )}
            </Flex>
            {horario.abierto && (
              <>
                <VStack spacing={2} mt={2} alignItems="center">
                  {horario.horarioPartido && <Text>Manana</Text>}
                  <Flex justifyContent="space-between" w="full">
                    <Controller
                      name={`horario[${index}].abreManana`}
                      control={control}
                      render={({ field }) => (
                        <Select {...field}>{generarOpcionesDeTiempo()}</Select>
                      )}
                    />
                    <Controller
                      name={`horario[${index}].cierraManana`}
                      control={control}
                      render={({ field }) => (
                        <Select {...field}>
                          {generarOpcionesDeTiempo(
                            parseInt(horarios[index].abreManana.split(':')[0]),
                          )}
                        </Select>
                      )}
                    />
                  </Flex>
                </VStack>
                {horario.horarioPartido && (
                  <VStack spacing={2} mt={2} alignItems="center">
                    <Text>Tarde</Text>
                    <Flex justifyContent="space-between" w="full">
                      <Controller
                        name={`horario[${index}].abreTarde`}
                        control={control}
                        render={({ field }) => (
                          <Select {...field}>
                            {generarOpcionesDeTiempo(
                              parseInt(
                                horarios[index].cierraManana.split(':')[0],
                              ),
                            )}
                          </Select>
                        )}
                      />
                      <Controller
                        name={`horario[${index}].cierraTarde`}
                        control={control}
                        render={({ field }) => (
                          <Select {...field}>
                            {generarOpcionesDeTiempo(
                              parseInt(horarios[index].abreTarde.split(':')[0]),
                            )}
                          </Select>
                        )}
                      />
                    </Flex>
                  </VStack>
                )}
              </>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default HorarioStep;
