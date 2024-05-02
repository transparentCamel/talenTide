import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '../../components/dashboard/Heading';
import SearchInput from '../../components/dashboard/SearchInput';

export default function AdminWorkspace() {
  const [tasks, setTasks] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, [tasks]);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.category.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.dateAssigned.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.dateDue.toLowerCase().includes(searchInput.toLowerCase())
  );
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <section className=' border-2 rounded-lg p-4 mt-[18px] mx-4'>
      <Heading heading={'Task database'} />
      <table className='w-full flex flex-col border-2 rounded-lg mt-8 shadow-md'>
        <div className='w-full flex items-center border-b-2 p-4'>
          <h3 className='mr-4'>Team members</h3>
          <div className='flex flex-row  gap-1 bg-slate-100 px-4 py-2 rounded-full'>
            {filteredTasks ? (
              <p>{filteredTasks.length}</p>
            ) : (
              <p>{tasks.length}</p>
            )}
            <p>
              {tasks.length === 1 || filteredTasks.length === 1
                ? 'task'
                : 'tasks'}
            </p>
          </div>
          <SearchInput
            placeholder='Search employees'
            onChange={handleSearchInputChange}
            state={searchInput}
            setState={() => setSearchInput('')}
          />
          <button
            className='px-4 py-2 bg-black text-white rounded-lg ml-auto hover:bg-blue duration-150'
            onClick={''}
          >
            + Add task
          </button>
        </div>
        <thead className='p-4'>
          <tr className='flex'>
            <th className='w-1/5 text-start'>Title</th>
            <th className='w-1/5 text-start'>Category</th>
            <th className='w-1/5 text-start'>Date Assigned</th>
            <th className='w-1/5 text-start'>Date Due</th>
            <th className='w-1/5 text-start'>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr
              key={task._id}
              className={`p-4 flex items-center ${
                index % 2 !== 1 ? 'bg-slate-100' : ''
              }`}
            >
              <td className='w-1/5'>{task.title}</td>
              <td className='w-1/5'>{task.category}</td>
              <td className='w-1/5'>
                {new Date(task.dateAssigned).toLocaleString('lt-LT', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
              </td>
              <td className='w-1/5'>
                {new Date(task.dateDue).toLocaleString('lt-LT', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
              </td>
              <td className='w-1/5'>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
