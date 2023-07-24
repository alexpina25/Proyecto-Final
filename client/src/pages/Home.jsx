import React from "react";
import { Container } from "@mui/material";
import SearchBar from "../components/SearchBar";
import ServiciosCategories from "../components/ServiciosCategories";
import PopularServicios from "../components/PopularServicios";

const Home = () => {
  return (
    <>
      <Container >
        <SearchBar />
        <ServiciosCategories />
        <PopularServicios />
      </Container>
    </>
  );
};

export default Home;