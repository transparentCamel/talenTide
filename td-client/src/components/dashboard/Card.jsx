import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Card({ icon, h2, p, h3 }) {
  return (
    <div className='bg-white  p-4 border-2 rounded-xl '>
      <div className='flex gap-4'>
        <FontAwesomeIcon
          icon={icon}
          className='w-6 h-6 flex items-center border-2 rounded-lg p-2 '
        />
        <h2 className='max-sm:text-2xl flex items-center justify-center'>
          {h2}
        </h2>
      </div>

      <p className='text-gray-400 mt-8 max-sm:mt-4'>{p}</p>
      <h3>{h3}</h3>
    </div>
  );
}
