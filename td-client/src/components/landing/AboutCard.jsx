import React from 'react';

export default function AboutCard({ heading, textShort, textLong }) {
  return (
    <div className='rounded-xl py-4 px-4 md:px-16 text-white flex flex-col items-center backdrop-blur-lg backdrop-filter bg-black bg-opacity-20 text-center shadow-md'>
      <h2 className='mb-2 sm:mb-4'>{heading}</h2>
      <p className='mb-2'>{textShort}</p>
      <p>{textLong}</p>
    </div>
  );
}
