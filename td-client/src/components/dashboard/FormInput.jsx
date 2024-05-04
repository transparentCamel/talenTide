import React from 'react';

export default function FormInput({
  error,
  label,
  type,
  name,
  value,
  onChange,
  options,
  errorStyles,
  optionPlaceholder,
}) {
  return (
    <div className='flex flex-col relative'>
      {error && (
        <span className={`text-red absolute ${errorStyles}`}>{error}</span>
      )}
      <label htmlFor={name}>{label}</label>
      {options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`block appearance-none w-full border-2 rounded-lg p-2 mb-4  ${
            error && 'border-red'
          }`}
        >
          <option value='' disabled hidden>
            {optionPlaceholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          className={`mb-4 ${error && 'border-red'}`}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
