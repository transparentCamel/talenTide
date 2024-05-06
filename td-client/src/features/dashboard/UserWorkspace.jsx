import React, { useEffect, useState } from 'react';
import Heading from '../../components/dashboard/Heading';
import axios from 'axios';
import { useTokenFetch } from '../../customHooks/useTokenFetch';
import UserTaskCard from '../../components/dashboard/UserTaskCard';

export default function UserWorkspace() {
  const [tasks, setTasks] = useState([]);
  const { user } = useTokenFetch();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tasks');

        const userTasks = response.data.filter(
          (task) => task.assignedUserId === user.id
        );
        setTasks(userTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [user.id]);

  return (
    <section className="border-2 rounded-lg p-4 mt-[18px] mx-4">
      <Heading heading={'Your tasks'} />
      <div>
        <ul>
          {tasks.map((task) => (
            <UserTaskCard
              title={task.title}
              updatedAt={new Date(task.updatedAt).toLocaleString('lt-LT', {
                dateStyle: 'short',
              })}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
