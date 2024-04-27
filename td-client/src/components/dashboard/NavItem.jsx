import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function NavItem({ icon, text, onClick, isActive }) {
  return (
    <div
      className={`flex flex-row gap-4 items-center px-4 py-2 rounded-xl select-none duration-150 ${
        isActive ? 'bg-sky-50 text-blue' : ' hover:bg-blue hover:text-white '
      }`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className='w-6 h-6 flex items-center' />
      <p>{text}</p>
    </div>
  );
}
