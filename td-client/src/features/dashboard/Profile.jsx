import React, { useEffect, useState } from 'react';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/dashboard/Card';
import { jwtDecode } from 'jwt-decode';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [timePassed, setTimePassed] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);

      const startDate = new Date(decodedToken.startDate);
      const currentDate = new Date();
      const years = currentDate.getFullYear() - startDate.getFullYear();
      const months = currentDate.getMonth() - startDate.getMonth();
      const days = Math.floor(
        (currentDate - startDate) / (1000 * 60 * 60 * 24)
      );

      if (years > 0) {
        setTimePassed(years === 1 ? `${years} year` : `${years} years`);
      } else if (months > 0) {
        setTimePassed(months === 1 ? `${months} month` : `${months} months`);
      } else {
        setTimePassed(days === 1 ? `${days} day` : `${days} days`);
      }
    }
  }, []);

  return (
    <section className='ml-4 mt-3 pr-16 flex flex-col gap-8'>
      {user ? (
        <div className='flex justify-between'>
          <Card
            icon={faCalendarDays}
            h2={`${timePassed} with us! ⚡`}
            p={'Joined since'}
            h3={user.startDate}
          />
          <Card
            icon={faCalendarDays}
            h2={'Years Passed'}
            p={'Years since joined'}
            h3={'Calculating...'}
          />
          <Card
            icon={faCalendarDays}
            h2={'Date With us!'}
            p={'Joined since'}
            h3={'Date'}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}
