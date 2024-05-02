import React from 'react';

export default function Heading({ heading }) {
  return (
    <header className='flex flex-row gap-2'>
      <div className='bg-orange-500 w-2 rounded-full'></div>
      <h2>{heading}</h2>
    </header>
  );
}
