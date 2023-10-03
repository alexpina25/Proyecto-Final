import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: '#27545F',
    info: '#24222a',
    success: '#76af57',
    warning: '#f49f1f',
    danger: '#f44336',
    blanco: '#F6F6F6',
    verde: '#8DB79E',
    marron: '#80877A',
    negro: '#383D42',
  },
  fonts: {
    body: "'Segoe UI', sans-serif",
    heading: "'Segoe UI', sans-serif",
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  // Aquí se puede especificar cómo deben cambiar los colores en el modo oscuro.
  // Por simplicidad, podríamos invertir simplemente los colores principales.
  // Si decides personalizar los colores de manera más específica, esto es donde lo harías.
  styles: {
    global: (props) => ({
      body: {
        color:
          props.colorMode === 'dark' ? theme.colors.blanco : theme.colors.negro,
        bg:
          props.colorMode === 'dark' ? theme.colors.negro : theme.colors.blanco,
      },
    }),
  },
  components: {
    Button: {
      // Estilos base para el botón
      baseStyle: {},
      // Estilos para los diferentes tamaños del botón
      sizes: {},
      // Estilos para las diferentes variantes del botón
      variants: {
        solid: {
          _hover: {
            // Aquí puedes poner el color que quieras que tenga el botón al hacer hover
            bg: 'negro',
            color: 'blanco',
          },
        },
      },
      // Estilos predeterminados
      defaultProps: {},
    },
  },
});

export default theme;
