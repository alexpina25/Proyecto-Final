import React, { useRef } from 'react';
import Hero from '../components/landing/Hero';
import NavBar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';


const LandingPage = () => {
  const heroRef = useRef(null);
  return (
    <>
      <NavBar heroRef={heroRef} />
      <Hero heroRef={heroRef} />

      <Footer />
    </>
  );
};

export default LandingPage;
