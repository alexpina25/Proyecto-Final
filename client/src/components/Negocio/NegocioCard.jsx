import React from 'react';
import {
  Box,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  useTheme,
  Divider,
} from '@chakra-ui/react';

const BusinessCard = ({ business }) => {
  const theme = useTheme();

  return (
    <Box maxW="300" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={business.imageUrl} alt={business.name} borderRadius="lg" />
      <Stack mt={3}>
        <Heading size="md">{business.name}</Heading>
        <Text>{business.description}</Text>
        <Button colorScheme="verde" variant="solid">
          Reservar
        </Button>
      </Stack>
    </Box>
  );
};

export default BusinessCard;
