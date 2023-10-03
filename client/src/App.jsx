import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './styles/theme';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <div>
        <Outlet />
      </div>
    </ChakraProvider>
  );
};

export default App;
