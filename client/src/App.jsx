import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const App = () => {
  return (
    <>
    <ThemeProvider theme={theme}>
    <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;