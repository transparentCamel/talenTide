import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '../../components/dashboard/Heading';
import SearchInput from '../../components/dashboard/SearchInput';
import TaskForm from './TaskForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export default function AdminWorkspace() {
  const [tasks, setTasks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.category.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.priority.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.status.toLowerCase().includes(searchInput.toLowerCase())
  );

  const getStatusRender = (status) => {
    switch (status) {
      case 'completed':
        return <p className='text-green-500'>Completed</p>;
      case 'in_progress':
        return <p className='text-yellow-500'>In Progress</p>;
      case 'pending':
        return <p className='text-slate-600'>Pending</p>;
      case 'late':
        return <p className='text-red'>Late</p>;
      default:
        return <p>{status}</p>;
    }
  };

  const getPriorityRender = (priority) => {
    switch (priority) {
      case 'low':
        return <p className='text-green-500'>Low</p>;
      case 'medium':
        return <p className='text-yellow-500'>Medium</p>;
      case 'high':
        return <p className='text-red'>High</p>;
      default:
        return <p>{priority}</p>;
    }
  };

  const handleEditTaskClick = (task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  return (
    <section className='border-2 rounded-lg p-4 mt-[18px] mx-4 '>
      <Heading heading={'Task database'} />
      <div className='w-full flex items-center py-4 max-md:flex-col max-md:items-start gap-4'>
        <div className='flex items-center'>
          <h3 className='mr-4'>Tasks</h3>
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
        </div>
        <div className='flex w-full max-sm:flex-col gap-4'>
          <SearchInput
            placeholder='Search tasks'
            onChange={handleSearchInputChange}
            state={searchInput}
            setState={() => setSearchInput('')}
            divClass={'max-sm:w-full'}
            inputClass={'max-sm:w-full'}
          />
          <button
            className='px-4 py-2 bg-black text-white rounded-lg ml-auto hover:bg-blue duration-150 max-sm:ml-0'
            onClick={() => {
              setIsFormOpen(true);
            }}
          >
            + Add task
          </button>
        </div>
      </div>
      <div className='overflow-x-auto  border-2 rounded-xl'>
        <table className='w-full  shadow-md'>
          <thead>
            <tr>
              <th className='w-1/6 p-4 text-left'>Title</th>
              <th className='w-1/6 p-4 text-left'>Category</th>
              <th className='w-1/6 p-4 text-left'>Priority</th>
              <th className='w-1/6 p-4 text-left'>Date Assigned</th>
              <th className='w-1/6 p-4 text-left'>Date Due</th>
              <th className='w-1/6 p-4 text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr
                key={task._id}
                className={index % 2 === 0 ? 'bg-gray-100' : ''}
              >
                <td className='p-4'>{task.title}</td>
                <td className='p-4'>{task.category}</td>
                <td className='p-4'>{getPriorityRender(task.priority)}</td>
                <td className='p-4'>
                  {new Date(task.createdAt).toLocaleString('lt-LT', {
                    dateStyle: 'short',
                  })}
                </td>
                <td className='p-4'>
                  {new Date(task.dateDue).toLocaleString('lt-LT', {
                    dateStyle: 'short',
                  })}
                </td>
                <td className='p-4'>{getStatusRender(task.status)}</td>
                <td className='p-4'>
                  <FontAwesomeIcon
                    icon={faPen}
                    className='cursor-pointer text-slate-600 hover:text-blue duration-150'
                    onClick={() => handleEditTaskClick(task)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isFormOpen && (
        <TaskForm
          formTitle={'Add Task'}
          btnText={'Add'}
          onClose={() => {
            setIsFormOpen(false);
          }}
        />
      )}
      {isEditOpen && (
        <TaskForm
          formTitle={'Edit Task'}
          btnText={'Save'}
          onClose={() => {
            setIsEditOpen(false);
          }}
          task={selectedTask}
        />
      )}
    </section>
  );
}
