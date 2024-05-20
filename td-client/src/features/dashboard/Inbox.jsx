import React, { useEffect, useState } from 'react';
import Heading from '../../components/dashboard/Heading';
import { useTokenFetch } from '../../customHooks/useTokenFetch';
import axios from 'axios';
import InboxCard from '../../components/dashboard/InboxCard';

export default function Inbox() {
  const [pendingTasks, setPendingTasks] = useState([]);
  const { user } = useTokenFetch();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tasks');

        const userTasks = response.data.filter(
          (task) => task.assignedTo === user.userId && task.status === 'pending'
        );
        setPendingTasks(userTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [user.id]);
  return (
    <section className='border-2 rounded-lg p-4 mt-[18px] mx-4 bg-white'>
      <Heading heading={'Inbox'} />
      <div className='mt-8'>
        <p className='text-slate-600 mb-4'>
          You have {pendingTasks.length} new{' '}
          {pendingTasks.length === 1 ? 'message' : 'messages'}
        </p>
        <ul className='flex flex-col gap-8'>
          {pendingTasks.map((task) => (
            <InboxCard
              title={'New pending task'}
              date={task.updatedAt ? task.updatedAt : task.dateAssigned}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
