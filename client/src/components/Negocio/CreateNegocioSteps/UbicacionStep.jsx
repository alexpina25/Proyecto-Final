import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  AspectRatio,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';


const UbicacionStep = ({ control, errors }) => {
  return (
    <>
      <FormControl mt={4}>
        <FormLabel htmlFor="ubicacion.calle">Calle</FormLabel>
        <Controller
          name="ubicacion.calle"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel htmlFor="ubicacion.ciudad">Ciudad</FormLabel>
        <Controller
          name="ubicacion.ciudad"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </FormControl>

      <Flex direction={{ base: 'column', md: 'row' }} gap={2}>
        <FormControl mt={4}>
          <FormLabel htmlFor="ubicacion.provincia">Provincia</FormLabel>
          <Controller
            name="ubicacion.provincia"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel htmlFor="ubicacion.codigoPostal">Código Postal</FormLabel>
          <Controller
            name="ubicacion.codigoPostal"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel htmlFor="ubicacion.pais">País</FormLabel>
          <Controller
            name="ubicacion.pais"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </FormControl>
      </Flex>

      {/* <AspectRatio ratio={16 / 9} height={"300px"} mt={4}>
        <LoadScript googleMapsApiKey="">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={11}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </AspectRatio> */}
    </>
  );
};

export default UbicacionStep;
