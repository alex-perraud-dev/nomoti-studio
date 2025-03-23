import React from 'react';
import About from '../sections/About';
import Shop from '../sections/Shop';
import Contact from '../sections/Contact';
import Banner from '../sections/Banner';
import NewArrival from '../sections/NewArrival';
import Footer from '../sections/Footer';
import Home from '../sections/Home';

const HomePage = () => {
  return (
    <>
      <Home />
      <Contact />

      <About />
      <Shop />
      <Banner />
      <NewArrival />
    </>
  );
};

export default HomePage;
