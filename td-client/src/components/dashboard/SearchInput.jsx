import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function SearchInput({
  placeholder,
  state,
  setState,
  onChange,
}) {
  return (
    <div className='relative ml-8'>
      <input
        type='text'
        className='pr-12'
        value={state}
        onChange={onChange}
        placeholder={placeholder}
      />
      {state && (
        <FontAwesomeIcon
          icon={faXmark}
          className='absolute p-2 top-1 mt-0.5 right-2 cursor-pointer hover:text-blue duration-150'
          onClick={() => {
            setState('');
          }}
        />
      )}
    </div>
  );
}
