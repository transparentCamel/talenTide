import React from 'react';

export default function ({ type, text }) {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-slate-500'>{type}</p>
      <p>{text}</p>
    </div>
  );
}
