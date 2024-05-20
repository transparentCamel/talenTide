import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

export default function FaqCard({ title, text }) {
  const [isopenned, setOpenned] = useState(false);
  return (
    <div
      className='pb-4 px-2 border-b-2 border-black flex items-center cursor-pointer select-none'
      onClick={() => {
        setOpenned(!isopenned);
      }}
    >
      <span className='pr-4'>
        <h3 className='font-semibold mb-4'>{title}</h3>
        <p className={`text-slate-600 ${isopenned ? '' : 'hidden'}`}>{text}</p>
      </span>
      <span className='ml-auto h-full'>
        <FontAwesomeIcon
          icon={isopenned ? faMinus : faPlus}
          className=' h-6 '
        />
      </span>
    </div>
  );
}
