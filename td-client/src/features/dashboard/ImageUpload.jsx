import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useTokenFetch } from '../../customHooks/useTokenFetch';

export function ImageUpload() {
  const { user, updateUserProfileImage } = useTokenFetch();
  const inputFile = useRef(null);

  const handleImageUpload = async (event) => {
    const selectedImage = event.target.files[0];
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('profileImage', selectedImage);

    try {
      const response = await axios.post(
        `http://localhost:3001/users/${user.userId}/upload-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        await fetchUserProfileImage(user.userId);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const fetchUserProfileImage = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${userId}/getImage`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        updateUserProfileImage(response.data.profileImage);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  useEffect(() => {
    if (!user.profileImage) {
      fetchUserProfileImage(user.userId);
    }
  }, [user]);

  return (
    <div
      className='rounded-full p-4 border-2 flex flex-col items-center justify-center w-32 h-32 gap-2 cursor-pointer hover:text-blue duration-150'
      onClick={() => {
        inputFile.current.click();
      }}
    >
      <FontAwesomeIcon icon={faImage} className='w-8 h-8' />
      <p className='text-slate-500 text-xs'>Upload image</p>
      <input
        ref={inputFile}
        id='upload-input'
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        className='hidden'
      />
    </div>
  );
}
