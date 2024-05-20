import React from 'react';

export default function Button({ href, text, className }) {
  return (
    <a
      href={href}
      className={`bg-blue text-white py-2 px-6 rounded-full shadow-md cursor-pointer text-xl select-none hover:bg-sky-500 duration-150 ${className}`}
    >
      {text}
    </a>
  );
}
