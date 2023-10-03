import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  Input,
} from '@chakra-ui/react';

const HorarioStep = () => {
  const diasDeLaSemana = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];
  const [horarios, setHorarios] = useState(
    diasDeLaSemana.map((dia) => ({
      dia,
      abierto: false,
      abreMañana: '',
      cierraMañana: '',
      cerradoMediodia: false,
      abreTarde: '',
      cierraTarde: '',
    })),
  );

  const actualizarHorario = (index, campo, valor) => {
    const nuevosHorarios = [...horarios];
    nuevosHorarios[index][campo] = valor;
    setHorarios(nuevosHorarios);
  };

  return (
    <Box>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Abierto</Th>
            <Th>Día</Th>
            <Th>Abre (Mañana)</Th>
            <Th>Cierra (Mañana)</Th>
            <Th>Cerrado (Mediodía)</Th>
            <Th>Abre (Tarde)</Th>
            <Th>Cierra (Tarde)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {horarios.map((horario, index) => (
            <Tr key={index}>
              <Td>
                <Checkbox
                  isChecked={horario.abierto}
                  onChange={(e) =>
                    actualizarHorario(index, 'abierto', e.target.checked)
                  }
                />
              </Td>
              <Td>{horario.dia}</Td>
              <Td>
                <Input
                  type="time"
                  hidden={!horario.abierto}
                  onChange={(e) =>
                    actualizarHorario(index, 'abreMañana', e.target.value)
                  }
                  step={300} // Esto establece el paso a 5 minutos
                />
              </Td>
              <Td>
                <Input
                  type="time"
                  hidden={!horario.abierto}
                  onChange={(e) =>
                    actualizarHorario(index, 'cierraMañana', e.target.value)
                  }
                  step={300} // Esto establece el paso a 5 minutos
                />
              </Td>
              <Td>
                <Checkbox
                  isChecked={horario.cerradoMediodia}
                  hidden={!horario.abierto}
                  onChange={(e) =>
                    actualizarHorario(
                      index,
                      'cerradoMediodia',
                      e.target.checked,
                    )
                  }
                />
              </Td>
              {horario.cerradoMediodia && (
                <>
                  <Td>
                    <Input
                      type="time"
                      hidden={!horario.abierto}
                      onChange={(e) =>
                        actualizarHorario(index, 'abreTarde', e.target.value)
                      }
                      step={300} // Esto establece el paso a 5 minutos
                    />
                  </Td>
                  <Td>
                    <Input
                      type="time"
                      hidden={!horario.abierto}
                      onChange={(e) =>
                        actualizarHorario(index, 'cierraTarde', e.target.value)
                      }
                      step={300} // Esto establece el paso a 5 minutos
                    />
                  </Td>
                </>
              )}
              {!horario.cerradoMediodia && (
                <>
                  <Td></Td>
                  <Td></Td>
                </>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default HorarioStep;
