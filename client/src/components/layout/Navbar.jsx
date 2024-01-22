import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import {
  Flex,
  Button,
  Box,
  useBreakpointValue,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Heading,
  Avatar,
  Circle,
} from '@chakra-ui/react';
import { CalendarIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [scrolling, setScrolling] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      height="10vh"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex={10}
      justify="space-between"
      align="center"
      p={4}
      bg={scrolling ? 'blackAlpha.700' : 'transparent'}
      transition="background-color 0.3s"
    >
      <Box color={'verde'} cursor={'pointer'}>
        <Heading size={'2xl'} onClick={() => navigate('/')}>
          BOOKYALL
        </Heading>
      </Box>

      {isMobile ? (
        <>
          <IconButton ref={btnRef} icon={<HamburgerIcon />} onClick={onOpen} />
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                  <VStack spacing={4}>
                    {user ? (
                      <>
                        {/* Contenido para usuarios logueados */}
                        <Button
                          bg={'verde'}
                          onClick={() => navigate('/dashboard')}
                        >
                          <Avatar bg="teal" size={'xs'} mr={'15px'} />
                          Perfil
                        </Button>
                        {/* ... otras opciones para usuarios logueados */}
                      </>
                    ) : (
                      <>
                        {/* Contenido para usuarios NO logueados */}
                        <Button bg={'verde'} onClick={() => navigate('/login')}>
                          <Avatar bg="teal" size={'xs'} mr={'15px'} />
                          Entrar
                        </Button>
                        <Button>Dar de alta mi negocio</Button>
                      </>
                    )}
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      ) : (
        <Flex>
          {user ? (
            <>
              {/* Contenido para usuarios logueados en desktop */}
              <Button mr={4} bg={'verde'} onClick={() => navigate('/perfil')}>
                <Avatar bg="teal" size={'xs'} mr={'10px'} />
                Mi Perfil
              </Button>
              <Button mr={4} bg={'verde'} onClick={() => navigate('/')}>
                <CalendarIcon bg="teal" size={'xs'} mr={'10px'} />
                Mis Reservas
              </Button>
              <Button bg={'verde'} onClick={logout}>
                <Circle
                  bg="teal"
                  size="25px"
                  mr="10px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CloseIcon />
                </Circle>
                Cerrar Sesión
              </Button>
              {/* ... otras opciones para usuarios logueados en desktop */}
            </>
          ) : (
            <>
              {/* Contenido para usuarios NO logueados en desktop */}
              <Button m={2} bg={'blanco'} onClick={() => navigate('/login')}>
                <Avatar bg="teal" size={'xs'} mr={'15px'} />
                ENTRAR
              </Button>
              <Button
                m={2}
                bg={'teal'}
                color={'blanco'}
                onClick={() => {
                  navigate('/alta-negocio');
                }}
              >
                DAR DE ALTA MI NEGOCIO
              </Button>
            </>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default NavBar;
