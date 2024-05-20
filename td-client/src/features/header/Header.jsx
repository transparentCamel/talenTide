import React from 'react';
import HeaderNav from './HeaderNav';

export default function Header() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <header className='flex items-center  px-8 2xl:px-64 xl:px-32 lg:px-16 py-4 shadow-md select-none sticky top-0 w-full z-40 bg-white'>
      <h2 onClick={scrollToTop} style={{ cursor: 'pointer' }}>
        Talentide
      </h2>
      <HeaderNav />
    </header>
  );
}
