import React, { useEffect, useState } from 'react';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/dashboard/Card';
import { useTokenFetch } from '../../customHooks/useTokenFetch';

export default function Profile() {
  const [timePassed, setTimePassed] = useState(null);
  const [formattedStartDate, setFormattedStartDate] = useState('');
  const { user } = useTokenFetch();
  useEffect(() => {
    if (user) {
      const startDate = new Date(user.startDate);
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
      const formattedDate = startDate.toLocaleDateString('lt-LT');
      setFormattedStartDate(formattedDate);
    }
  }, [user]);

  return (
    <section className='ml-4 mt-3 pr-16 flex flex-col gap-8'>
      <div className='flex justify-between'>
        <Card
          icon={faCalendarDays}
          h2={`${timePassed} with us! ⚡`}
          p={'Joined since'}
          h3={formattedStartDate}
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
    </section>
  );
}
