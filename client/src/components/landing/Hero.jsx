import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
function Hero({ heroRef }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const primary = theme.colors.primary;
  const blanco = theme.colors.blanco;
  const negro = theme.colors.negro;
  const marron = theme.colors.marron;

  return (
    <Flex
      ref={heroRef}
      w={'full'}
      h={'60vh'}
      backgroundImage={
        'url(blue_bg.jpg)' // Puedes cambiar esta URL por la imagen de fondo que desees
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
    >
      <Flex
        w={'full'}
        h={'full'}
        align={'center'}
        justify={'center'}
        bg={'blackAlpha.600'}
      >
        <Stack spacing={8} w={'full'} maxW={'md'} px={6} textAlign={'center'}>
          <Heading fontSize={'4xl'} color={blanco} fontWeight={500}>
            RESERVAR NUNCA FUE TÁN FÁCIL
          </Heading>
          <Text color={blanco}>
            Encuentra y reserva servicios en tu área en cuestión de minutos.
          </Text>
          <Stack
            direction={['column', 'column', 'row']} // "column" en móviles y tablets, "row" en pantallas más grandes
            spacing={4}
            align={'center'}
            justify={'center'}
          >
            <Button
              bg={blanco}
              color={negro}
              _hover={{
                bg: marron,
                color: blanco,
              }}
              size={'lg'}
              fontSize={'md'}
              onClick={() => navigate('/login')}
            >
              RESERVAR YA!
            </Button>
            <Button
              colorScheme={'teal'}
              size={'lg'}
              fontSize={'md'}
              onClick={() => {
                navigate("/alta-negocio")
              }}
            >
              Añade tu negocio
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default Hero;
