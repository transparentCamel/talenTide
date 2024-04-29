import React from 'react';

export default function DeleteAuth({
  onClose,
  id,
  name,
  surname,
  email,
  deleteClick,
}) {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-8 max-w-[512px] flex flex-col gap-4 rounded-xl'>
        <h2 className='mb-4'>
          Are you sure you want to <span className='text-red'>delete</span> this
          employee?
        </h2>
        <div>
          <p className='text-slate-500'>ID</p>
          <p>{id}</p>
        </div>
        <div className='flex gap-32'>
          <div>
            <p className='text-slate-500'>Name</p>
            <p>{name}</p>
          </div>
          <div className=''>
            <p className='text-slate-500'>Last Name</p>
            <p>{surname}</p>
          </div>
        </div>
        <div className=''>
          <p className='text-slate-500'>Email</p>
          <p>{email}</p>
        </div>
        <div className='flex gap-4 mt-4'>
          <button
            className='rounded-lg px-4 py-2 bg-red hover:bg-rose-600 text-white duration-150'
            onClick={deleteClick}
          >
            Delete
          </button>
          <button
            className='rounded-lg px-4 py-2 bg-slate-100 hover:bg-black hover:text-white duration-150'
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
