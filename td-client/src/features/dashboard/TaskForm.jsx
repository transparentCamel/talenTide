import React, { useState } from 'react';
import FormInput from '../../components/dashboard/FormInput';

export default function TaskForm({ formTitle, btnText, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    dateAssigned: '',
    dateDue: '',
    status: '',
    priority: '',
    createdAt: '',
    updatedAt: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
    emaidateAssigned: '',
    dateDue: '',
    status: '',
    priority: '',
  });

  const priorityOptions = [
    {
      value: 'high',
      label: 'High',
    },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <form className='bg-white p-8 flex flex-col rounded-xl' onSubmit=''>
        <h2 className='mb-8'>{formTitle}</h2>
        <FormInput
          error={errors.title}
          errorStyles={'right-0'}
          name={'title'}
          type={'text'}
          label={'Title'}
          value={formData.title}
          onChange={''}
        />
        <label htmlFor='description'>Description</label>
        <textarea
          type='text'
          name='description'
          className=' min-h-32 max-h-64 mb-4'
        ></textarea>
        <FormInput
          error={errors.category}
          errorStyles={'right-0'}
          name={'category'}
          type={'text'}
          label={'Category'}
          value={formData.category}
          onChange={''}
        />
        <FormInput
          error={errors.dateDue}
          errorStyles={'right-0'}
          name={'dateDue'}
          type={'date'}
          label={'Due date'}
          value={formData.dateDue}
          onChange={''}
        />
        <FormInput
          error={errors.priority}
          errorStyles={'right-0'}
          name={'priority'}
          label={'Priority'}
          value={formData.priority}
          onChange={''}
          options={priorityOptions}
          optionPlaceholder={'Choose priority'}
        />
        <div className='flex gap-4 mt-4'>
          <button
            type='submit'
            className='rounded-lg px-4 py-2 bg-blue text-white hover:bg-sky-500 duration-150'
          >
            {btnText}
          </button>
          <button
            className='rounded-lg px-4 py-2 bg-slate-100 hover:bg-red hover:text-white duration-150'
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
