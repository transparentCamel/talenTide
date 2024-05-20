import React, { useEffect, useState } from 'react';
import Card from '../../components/dashboard/Card';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Heading from '../../components/dashboard/Heading';
import { useTokenFetch } from '../../customHooks/useTokenFetch';

export default function AdminAnalytics() {
  const { user } = useTokenFetch();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tasks');
        const userTasks = response.data.filter(
          (task) => task.assignedTo === user.userId
        );
        setTasks(userTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const tasksAssignedThisWeek = tasks.filter((task) => {
    const taskCreatedAt = new Date(task.createdAt);
    const today = new Date();
    const startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    );
    return taskCreatedAt >= startOfWeek;
  });

  return (
    <section className='mt-1 p-4'>
      <Heading heading={'Analytics'} />
      <div className='flex flex-row mt-8 gap-8'>
        <Card
          icon={faChartSimple}
          h2={`Tasks Assigned: ${tasks.length} ⚡`}
          p={`Assigned This Week`}
          h3={tasksAssignedThisWeek.length}
        />
      </div>
    </section>
  );
}
