import React from 'react';
import Hero from '../features/landingPage/Hero';
import Header from '../features/header/Header';
import About from '../features/landingPage/About';
import Footer from '../features/landingPage/Footer';
import Faq from '../features/landingPage/Faq';

export default function Landing() {
  return (
    <main className='w-full'>
      <Header />
      <Hero />
      <About />
      <Faq />
      <Footer />
    </main>
  );
}
