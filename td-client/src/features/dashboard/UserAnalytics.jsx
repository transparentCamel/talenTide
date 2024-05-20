import React, { useEffect, useState } from 'react';
import Card from '../../components/dashboard/Card';
import { faChartSimple, faPercent } from '@fortawesome/free-solid-svg-icons';
import { useTokenFetch } from '../../customHooks/useTokenFetch';
import axios from 'axios';
import Heading from '../../components/dashboard/Heading';

export default function UserAnalytics() {
  const { user } = useTokenFetch();
  const [tasks, setTasks] = useState([]);
  const [allCompletedTasks, setAllCompletedTasks] = useState([]);
  const [completedTasksThisWeek, setCompletedTasksThisWeek] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchCompletedTasksThisWeek = async () => {
      try {
        const currentDate = new Date();
        const firstDayOfWeek = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - currentDate.getDay()
        );
        const lastDayOfWeek = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - currentDate.getDay() + 6
        );

        const completedTasks = tasks.filter(
          (task) =>
            task.assignedTo === user.userId && task.status === 'completed'
        );
        setAllCompletedTasks(completedTasks);

        const completedTasksThisWeek = completedTasks.filter((task) => {
          const taskUpdatedAt = new Date(task.updatedAt);
          return (
            taskUpdatedAt >= firstDayOfWeek && taskUpdatedAt <= lastDayOfWeek
          );
        });

        setCompletedTasksThisWeek(completedTasksThisWeek);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    };

    fetchCompletedTasksThisWeek();
  }, [tasks, user.id]);

  const conversionRate =
    tasks.length === 0 ? 0 : allCompletedTasks.length / tasks.length;
  const conversionRateWeekly =
    tasks.length === 0 ? 0 : completedTasksThisWeek.length / tasks.length;
  return (
    <section className='mt-1 p-4'>
      <Heading heading={'Analytics'} />
      <div className='flex flex-row mt-8 gap-8 max-md:flex-col'>
        <Card
          icon={faChartSimple}
          h2={`Tasks Completed: ${allCompletedTasks.length} ⚡`}
          p={`Completed This Week`}
          h3={completedTasksThisWeek.length}
        />
        <Card
          icon={faPercent}
          h2={`Conversion Rate: ${(conversionRate * 100).toFixed(2)}%`}
          p={`Conversion Rate This Week`}
          h3={`${(conversionRateWeekly * 100).toFixed(2)}%`}
        />
      </div>
    </section>
  );
}
