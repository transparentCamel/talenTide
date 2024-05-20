import React, { useEffect, useState } from 'react';
import EmployeeDetails from '../../components/dashboard/EmployeeDetails';
import { useTokenFetch } from '../../customHooks/useTokenFetch';
import { ImageUpload } from './ImageUpload';
import axios from 'axios';

export default function AccountDetails() {
  const { user } = useTokenFetch();
  const [image, setImage] = useState();

  useEffect(() => {
    if (user.profileImage) {
      axios
        .get(`http://localhost:3001/users/${user.userId}/getImage`)
        .then((res) => setImage(res.data.profileImage))
        .catch((err) => console.log(err));
    } else {
      setImage(null);
    }
  }, [user]);

  const renderProfileImage = () => {
    if (image) {
      return (
        <img
          src={`http://localhost:3001/images/${image}`}
          alt='Profile'
          className='w-32 h-32 rounded-full overflow-hidden object-cover'
        />
      );
    } else {
      return <ImageUpload />;
    }
  };

  return (
    <section className='flex flex-col bg-white p-4 rounded-lg border-2 max-lg:items-center max-lg:text-center'>
      <div className='flex flex-row gap-8 max-lg:flex-col'>
        <div className='flex items-center justify-center'>
          {renderProfileImage()}
        </div>
        <div className='flex flex-col gap-8'>
          <span className='flex flex-row gap-2 max-lg:justify-center'>
            <h3>{user.name}</h3>
            <h3> {user.surname}</h3>
          </span>

          <div className='flex flex-row gap-16 max-sm:flex-col'>
            <EmployeeDetails type={'Team'} text={user.team} />
            <EmployeeDetails type={'Phone number'} text={user.phone} />
            <EmployeeDetails type={'Email'} text={user.email} />
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
}
