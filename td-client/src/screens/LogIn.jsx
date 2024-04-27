import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/login',
        {
          id,
          password,
        }
      );

      if (response.status === 200) {
        setRole(response.data.role);
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <main className='h-screen flex items-center justify-center bg-gradient-to-r from-blue to-sky-300'>
      <form
        className='max-w-1/3 shadow-xl px-12 py-8 flex flex-col rounded-xl gap-4 bg-white'
        onSubmit={handleSubmit}
      >
        <h1>Welcome to TalentTide</h1>

        <div className='flex flex-col gap-8 mt-8 relative'>
          {message && <p className={`text-red absolute -top-8`}>{message}</p>}
          <span className='flex flex-col gap-2'>
            <label htmlFor='id'>Account ID</label>
            <input
              type='text'
              name='id'
              id='id'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </span>
          <span className='flex flex-col gap-2 relative'>
            <label htmlFor='password'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className='absolute top-12 right-6 mt-[6px] cursor-pointer hover:text-pink duration-150'
              onClick={togglePasswordVisibility}
            />
          </span>
          <button
            type='submit'
            name='submit'
            id='submit'
            className='bg-blue text-white py-2 px-6 rounded-full shadow-md cursor-pointer text-xl hover:bg-sky-500 duration-150'
          >
            Log In
          </button>
        </div>
        <Link
          to='/'
          className='text-red hover:opacity-80 self-start duration-150'
        >
          Go back to main page
        </Link>
      </form>
    </main>
  );
}
