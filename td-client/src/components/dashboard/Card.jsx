import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Card({ icon, h2, p, h3 }) {
  return (
    <div className='bg-white  p-4 border-2 rounded-xl '>
      <div className='flex gap-4 mb-8'>
        <FontAwesomeIcon
          icon={icon}
          className='w-6 h-6 flex items-center border-2 rounded-lg p-2 '
        />
        <h2>{h2}</h2>
      </div>

      <p className='text-gray-400'>{p}</p>
      <h3>{h3}</h3>
    </div>
  );
}
