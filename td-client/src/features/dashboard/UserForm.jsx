import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormInput from '../../components/dashboard/FormInput';

export default function UserForm({ onClose, title, user = null, btnText }) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
    birthDate: '',
    startDate: '',
    team: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
    birthDate: '',
    startDate: '',
    team: '',
  });

  useEffect(() => {
    if (user) {
      const formattedUserData = {
        ...user,
        birthDate: user.birthDate ? user.birthDate.slice(0, 10) : '',
        startDate: user.startDate ? user.startDate.slice(0, 10) : '',
      };
      setFormData(formattedUserData);
    } else {
      setFormData({
        name: '',
        surname: '',
        email: '',
        password: '',
        phone: '',
        birthDate: '',
        startDate: '',
        team: '',
      });
    }
  }, [user]);

  const options = [
    {
      value: 'Software Engineering',
      label: 'Software Engineering',
    },
    { value: 'Product', label: 'Product' },
    { value: 'Design', label: 'Design' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Marketing', label: 'Marketing' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = { ...errors };

    ['name', 'surname', 'email', 'password', 'team', 'phone'].forEach(
      (field) => {
        if (!formData[field]) {
          formIsValid = false;
          newErrors[field] = `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } is required`;
        }
      }
    );
    if (!formData.birthDate) {
      formIsValid = false;
      newErrors.birthDate = 'Birth date is required';
    }

    if (!formData.startDate) {
      formIsValid = false;
      newErrors.startDate = 'Start date is required';
    }

    if (formData.birthDate) {
      const currentDate = new Date();
      const userBirthDate = new Date(formData.birthDate);
      const userAge = currentDate.getFullYear() - userBirthDate.getFullYear();
      if (userAge < 16) {
        formIsValid = false;
        newErrors.birthDate = 'User must be 16 or older';
      }
    }

    if (formIsValid) {
      try {
        if (user) {
          await axios.put(`http://localhost:3001/users/${user._id}`, formData);
        } else {
          await axios.post('http://localhost:3001/users', formData);
        }
        onClose();
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <form
        className="bg-white p-8 flex flex-col rounded-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-8">{title}</h2>
        <div className="flex gap-8">
          <FormInput
            error={errors.name}
            errorStyles={'-top-6'}
            name={'name'}
            type={'text'}
            label={'Name'}
            value={formData.name}
            onChange={handleChange}
          />
          <FormInput
            error={errors.surname}
            errorStyles={'-top-6'}
            name={'surname'}
            type={'text'}
            label={'Surname'}
            value={formData.surname}
            onChange={handleChange}
          />
        </div>
        <FormInput
          error={errors.email}
          errorStyles={'right-0'}
          name={'email'}
          type={'email'}
          label={'Email'}
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          error={errors.phone}
          errorStyles={'right-0'}
          name={'phone'}
          type={'tel'}
          label={'Phone'}
          value={formData.phone}
          onChange={handleChange}
        />
        <FormInput
          error={errors.password}
          errorStyles={'right-0'}
          name={'password'}
          type={'text'}
          label={'Set password'}
          value={formData.password}
          onChange={handleChange}
        />

        <FormInput
          error={errors.team}
          errorStyles={'right-0'}
          name={'team'}
          label={'Team'}
          value={formData.team}
          onChange={handleChange}
          options={options}
          optionPlaceholder={'Select team'}
        />

        <FormInput
          error={errors.birthDate}
          errorStyles={'right-0'}
          name={'birthDate'}
          type={'date'}
          label={'Birth date'}
          value={formData.birthDate}
          onChange={handleChange}
        />
        <FormInput
          error={errors.startDate}
          errorStyles={'right-0'}
          name={'startDate'}
          type={'date'}
          label={'Start date'}
          value={formData.startDate}
          onChange={handleChange}
        />

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="rounded-lg px-4 py-2 bg-blue text-white hover:bg-sky-500 duration-150"
          >
            {btnText}
          </button>
          <button
            className="rounded-lg px-4 py-2 bg-slate-100 hover:bg-red hover:text-white duration-150"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
