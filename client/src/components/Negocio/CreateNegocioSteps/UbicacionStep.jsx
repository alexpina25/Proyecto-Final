import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FormControl, FormLabel, Input, Flex, AspectRatio } from '@chakra-ui/react';

const containerStyle = {
  width: '100%',
  height: '50%',
  maxHeight: '400px',
};

const center = {
  lat: 37.4221,
  lng: -122.0841,
};

const UbicacionStep = () => {
  useEffect(() => {
    // Tu código de inicialización aquí
  }, []);

  return (
    <>
      <FormControl mt={4}>
        <Input placeholder="Calle" id="location-input" />
      </FormControl>
      <FormControl mt={4}>
        <Input placeholder="Local, edificio, etc (opcional)" />
      </FormControl>
      <FormControl mt={4}>
        <Input placeholder="Ciudad" id="locality-input" />
      </FormControl>
      <Flex mt={4} justifyContent="space-between" gap={4}>
        <Input
          placeholder="Provincia"
          maxWidth="45%"
          id="administrative_area_level_1-input"
        />
        <Input
          placeholder="Código postal"
          maxWidth="45%"
          id="postal_code-input"
        />
        <Input placeholder="País" id="country-input" />
      </Flex>

      <AspectRatio ratio={16 / 9} height={"300px"} mt={4}>
        <LoadScript googleMapsApiKey="">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={11}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </AspectRatio>
    </>
  );
};

export default UbicacionStep;
