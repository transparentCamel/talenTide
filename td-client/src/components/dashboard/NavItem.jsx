import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function NavItem({ icon, text, onClick, isActive, number }) {
  return (
    <div
      className={`relative flex flex-row gap-4 items-center px-4 py-2 rounded-xl select-none duration-150 ${
        isActive ? 'bg-sky-50 text-blue' : ' hover:bg-blue hover:text-white '
      }`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className="w-6 h-6 flex items-center" />
      <p>{text}</p>
      {number && (
        <p className="absolute py-1 px-2 text-[10px] rounded-full text-white bg-red right-2">
          {number}
        </p>
      )}
    </div>
  );
}
