import React, { useEffect, useState } from 'react';
import FormInput from '../../components/dashboard/FormInput';
import axios from 'axios';

export default function TaskForm({ formTitle, btnText, task = null, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    dateDue: '',
    priority: '',
    assignedTo: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
    dateDue: '',
    priority: '',
    assignedTo: '',
  });
  const [assignedToOptions, setAssignedToOptions] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3001/users/', {
        params: {
          role: 'user',
        },
      })
      .then((response) => {
        const options = response.data.map((user) => ({
          value: user._id,
          label: `${user.name} ${user.surname}, ${user.team}`,
        }));
        setAssignedToOptions(options);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const priorityOptions = [
    {
      value: 'high',
      label: 'High',
    },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const postData = {
        ...formData,
        status: 'pending',
      };

      try {
        if (task) {
          await axios.put(
            `http://localhost:3001/api/tasks/${task._id}`,
            postData
          );
        } else {
          await axios.post('http://localhost:3001/api/tasks', postData);
        }
        onClose();
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key] === '') {
        errors[key] = 'is required';
      }
    });

    if (formData.dateDue !== '' && new Date(formData.dateDue) < new Date()) {
      errors.dateDue = 'Due date cannot be before today';
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  useEffect(() => {
    if (task) {
      const formattedTaskData = {
        ...task,
        dateDue: task.dateDue ? task.dateDue.slice(0, 10) : '',
      };
      setFormData(formattedTaskData);
    } else {
      setFormData({
        title: '',
        description: '',
        category: '',
        dateDue: '',
        priority: '',
        assignedTo: '',
      });
    }
  }, [task]);
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <form
        className='bg-white p-8 flex flex-col rounded-xl w-1/2 max-lg:w-full max-lg:mx-16 max-sm:mx-4 '
        onSubmit={handleFormSubmit}
      >
        <h2 className='mb-8'>{formTitle}</h2>
        <FormInput
          error={errors.title}
          errorStyles={'right-0'}
          name={'title'}
          type={'text'}
          label={'Title'}
          value={formData.title}
          onChange={handleInputChange}
        />
        <div className='relative'>
          <label htmlFor='description'>Description</label>
          <span className={`text-red absolute right-0`}>
            {errors.description}
          </span>
        </div>

        <textarea
          type='text'
          name='description'
          className={`min-h-32 max-h-64 mb-4 ${
            errors.description ? 'border-red' : ''
          }`}
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
        <FormInput
          error={errors.assignedTo}
          errorStyles={'right-0'}
          name={'assignedTo'}
          label={'Assign to'}
          value={formData.assignedTo}
          onChange={handleInputChange}
          options={assignedToOptions}
          optionPlaceholder={'Choose employee'}
        />
        <FormInput
          error={errors.category}
          errorStyles={'right-0'}
          name={'category'}
          type={'text'}
          label={'Category'}
          value={formData.category}
          onChange={handleInputChange}
        />
        <FormInput
          error={errors.dateDue}
          errorStyles={'right-0'}
          name={'dateDue'}
          type={'date'}
          label={'Due date'}
          value={formData.dateDue}
          onChange={handleInputChange}
        />
        <FormInput
          error={errors.priority}
          errorStyles={'right-0'}
          name={'priority'}
          label={'Priority'}
          value={formData.priority}
          onChange={handleInputChange}
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
