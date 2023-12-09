import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Select,
  Textarea,
  Badge,
  Wrap,
  Button,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

const CategoriesStep = ({ control, setValue, errors }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleAddCategory = (category) => {
    if (!selectedCategories.includes(category) && category !== '') {
      const newCategories = [...selectedCategories, category];
      setSelectedCategories(newCategories);
      setValue('categorias', newCategories); // Ahora se usa el estado actualizado
    }
  };

  const handleRemoveCategory = (category) => {
    const filteredCategories = selectedCategories.filter(
      (item) => item !== category,
    );
    setSelectedCategories(filteredCategories);
    setValue('categorias', filteredCategories);
  };

  return (
    <Box>
      {/* Campo para las categorías */}
      <FormControl isInvalid={errors.categorias}>
        <FormLabel htmlFor="categorias">Categorías</FormLabel>
        <Select
          placeholder="Seleccione una categoría"
          onChange={(e) => handleAddCategory(e.target.value)}
        >
          <option value="Peluqueria">Peluquería</option>
          <option value="Salon de uñas">Salón de uñas</option>
          <option value="Maquillaje">Maquillaje</option>
          <option value="Barberia">Barbería</option>
          <option value="Entrenador personal">Entrenador personal</option>
          <option value="Masajes">Masajes</option>
          <option value="Spa">Spa</option>
          <option value="Cuidado de piel">Cuidado de piel</option>
          <option value="Tatuajes">Tatuajes</option>
          <option value="Cuidado de pies">Cuidado de pies</option>
          <option value="Cejas y pestañas">Cejas y pestañas</option>
          <option value="Depilación">Depilación</option>
          <option value="Salud mental">Salud mental</option>
          <option value="Otros">Otros</option>
        </Select>
        <Wrap mt={2}>
          {selectedCategories.map((category, index) => (
            <Badge key={index} m={1}>
              {category}{' '}
              <Button size="xs" onClick={() => handleRemoveCategory(category)}>
                X
              </Button>
            </Badge>
          ))}
        </Wrap>
        <FormErrorMessage>
          {errors.categorias && errors.categorias.message}
        </FormErrorMessage>
      </FormControl>

      {/* Campo para la descripción */}
      <FormControl isInvalid={errors.descripcion} mt={4}>
        <FormLabel htmlFor="descripcion">Descripción</FormLabel>
        <Controller
          control={control}
          name="descripcion"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Textarea
              id="descripcion"
              placeholder="Ingrese la descripción del negocio"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
            />
          )}
        />
        <FormErrorMessage>
          {errors.descripcion && errors.descripcion.message}
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default CategoriesStep;
