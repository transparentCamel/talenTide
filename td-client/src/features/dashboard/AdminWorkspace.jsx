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

  const getStatusRender = (status) => {
    switch (status) {
      case 'completed':
        return <span className="text-green-500">Completed</span>;
      case 'in_progress':
        return <span className="text-yellow-500">In Progress</span>;
      case 'pending':
        return <span className="text-red">Pending</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const getPriorityRender = (priority) => {
    switch (priority) {
      case 'low':
        return <span className="text-green-500">Low</span>;
      case 'medium':
        return <span className="text-yellow-500">Medium</span>;
      case 'high':
        return <span className="text-red">High</span>;
      default:
        return <span>{priority}</span>;
    }
  };
  const handleEditTaskClick = (task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  return (
    <section className=" border-2 rounded-lg p-4 mt-[18px] mx-4">
      <Heading heading={'Task database'} />
      <table className="w-full flex flex-col border-2 rounded-lg mt-8 shadow-md">
        <div className="w-full flex items-center border-b-2 p-4">
          <h3 className="mr-4">Tasks</h3>
          <div className="flex flex-row  gap-1 bg-slate-100 px-4 py-2 rounded-full">
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
            placeholder="Search tasks"
            onChange={handleSearchInputChange}
            state={searchInput}
            setState={() => setSearchInput('')}
          />
          <button
            className="px-4 py-2 bg-black text-white rounded-lg ml-auto hover:bg-blue duration-150"
            onClick={() => {
              setIsFormOpen(true);
            }}
          >
            + Add task
          </button>
        </div>
        <thead className="p-4">
          <tr className="flex">
            <th className="w-1/6 text-start">Title</th>
            <th className="w-1/6 text-start">Category</th>
            <th className="w-1/6 text-start">Priority</th>
            <th className="w-1/6 text-start">Date Assigned</th>
            <th className="w-1/6 text-start">Date Due</th>
            <th className="w-1/6 text-start">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr
              key={task._id}
              className={`p-4 flex items-center relative ${
                index % 2 !== 1 ? 'bg-slate-100' : ''
              }`}
            >
              <td className="w-1/6">{task.title}</td>
              <td className="w-1/6">{task.category}</td>
              <td className="w-1/6">{getPriorityRender(task.priority)}</td>
              <td className="w-1/6">
                {new Date(task.dateAssigned).toLocaleString('lt-LT', {
                  dateStyle: 'short',
                })}
              </td>
              <td className="w-1/6">
                {new Date(task.dateDue).toLocaleString('lt-LT', {
                  dateStyle: 'short',
                })}
              </td>
              <td className="w-1/6">{getStatusRender(task.status)}</td>
              <FontAwesomeIcon
                icon={faPen}
                className="absolute right-4 cursor-pointer text-slate-600 hover:text-blue duration-150"
                onClick={() => handleEditTaskClick(task)}
              />
            </tr>
          ))}
        </tbody>
      </table>
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
