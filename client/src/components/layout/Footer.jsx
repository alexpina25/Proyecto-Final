import { Box, Flex, Text, Link, List, ListItem, Stack } from '@chakra-ui/react';
import { EmailIcon, PhoneIcon, InfoIcon } from '@chakra-ui/icons';

function Footer() {
  return (
    <Box bg="info" color="blanco" p={5}>
      <Flex direction={['column', 'row']} justify="space-between" wrap="wrap">
        <Box w={['100%', '30%']} mb={4}>
          <Text fontSize="xl" mb={2}>
            NOMBRE DE LA COMPAÑÍA
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Box>

        <Box w={['100%', '30%']} mb={4}>
          <Text fontSize="xl" mb={2}>
            CONTACTO
          </Text>
          <List spacing={3}>
            <ListItem display="flex" alignItems="center">
              <EmailIcon mr={2} />
              <Link href="mailto:info@tuempresa.com">info@tuempresa.com</Link>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <PhoneIcon mr={2} />
              <Text>+1 234 567 890</Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <InfoIcon mr={2} />
              <Text>123 Calle Principal, Ciudad</Text>
            </ListItem>
          </List>
        </Box>

        <Box w={['100%', '30%']}>
          <Text fontSize="xl" mb={2}>
            ENLACES RÁPIDOS
          </Text>
          <Stack spacing={3}>
            <Link href="/">Inicio</Link>
            <Link href="/sobre-nosotros">Sobre nosotros</Link>
            <Link href="/servicios">Servicios</Link>
            <Link href="/contacto">Contacto</Link>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Footer;
