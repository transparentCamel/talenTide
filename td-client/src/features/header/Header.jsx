import React from 'react';
import HeaderNav from './HeaderNav';

export default function Header() {
  return (
    <header className='flex items-center px-64 py-4 shadow-md'>
      <h2>Talentide</h2>
      <HeaderNav />
    </header>
  );
}
