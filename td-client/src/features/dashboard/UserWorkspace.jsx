import React, { useEffect, useState } from 'react';
import Heading from '../../components/dashboard/Heading';
import axios from 'axios';
import { useTokenFetch } from '../../customHooks/useTokenFetch';
import UserTaskCard from '../../components/dashboard/UserTaskCard';
import TaskView from './TaskView';
import SearchInput from '../../components/dashboard/SearchInput';

export default function UserWorkspace() {
  const [tasks, setTasks] = useState([]);
  const { user } = useTokenFetch();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskViewOpen, setIsTaskViewOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

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
  }, [user.id]);

  const handleCardClick = async (selectedTask) => {
    setIsTaskViewOpen(true);
    setSelectedTask(selectedTask);
    try {
      const taskToUpdate = tasks.find((task) => task._id === selectedTask._id);
      if (taskToUpdate && taskToUpdate.status === 'pending') {
        const response = await axios.put(
          `http://localhost:3001/tasks/${selectedTask._id}/userEdit`,
          {
            status: 'in_progress',
          }
        );

        setTasks(
          tasks.map((task) =>
            task._id === selectedTask._id
              ? { ...task, status: 'in_progress' }
              : task
          )
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const sortedTasks = tasks.sort((a, b) => {
    if (a.status === 'pending') return -1;
    if (a.status === 'in_progress' && b.status !== 'pending') return -1;
    if (
      a.status === 'completed' &&
      b.status !== 'pending' &&
      b.status !== 'in_progress'
    )
      return -1;
    return 1;
  });
  const filteredTasks = sortedTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.category.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.dateDue.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.updatedAt.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.createdAt.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.status.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.priority.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <section className='border-2 rounded-lg p-4 mt-[18px] mx-4 bg-white'>
      <div className='flex gap-4 max-sm:flex-col'>
        <Heading heading={'Your tasks'} />
        <SearchInput
          placeholder={'Search tasks'}
          state={searchInput}
          setState={() => {
            setSearchInput('');
          }}
          onChange={handleSearchInputChange}
          divClass={'max-sm:w-full'}
          inputClass={'max-sm:w-full'}
        />
      </div>
      <div className='mt-8'>
        <ul className='flex flex-col gap-8'>
          {filteredTasks.map((task) => (
            <UserTaskCard
              title={task.title}
              category={task.category}
              dateDue={new Date(task.dateDue).toLocaleString('lt-LT', {
                dateStyle: 'short',
              })}
              updatedAt={new Date(task.updatedAt).toLocaleString('lt-LT', {
                dateStyle: 'short',
              })}
              createdAt={new Date(task.createdAt).toLocaleString('lt-LT', {
                dateStyle: 'short',
              })}
              status={task.status}
              priority={task.priority}
              viewTask={() => handleCardClick(task)}
            />
          ))}
        </ul>
      </div>
      {isTaskViewOpen && (
        <TaskView
          taskId={selectedTask._id}
          title={selectedTask.title}
          dateDue={selectedTask.dateDue}
          priority={selectedTask.priority}
          dateAssigned={selectedTask.createdAt}
          updated={selectedTask.updatedAt}
          description={selectedTask.description}
          onClose={() => {
            setIsTaskViewOpen(false);
          }}
        />
      )}
    </section>
  );
}
