import axios from 'axios';
import React from 'react';

const getPriorityRender = (priority) => {
  switch (priority) {
    case 'low':
      return <p className="text-green-500">Low</p>;
    case 'medium':
      return <p className="text-yellow-500">Medium</p>;
    case 'high':
      return <p className="text-red">High</p>;
    default:
      return <p>{priority}</p>;
  }
};

const handleComplete = async (taskId) => {
  try {
    await axios.put(`http://localhost:3001/api/tasks/${taskId}/userEdit`, {
      status: 'completed',
    });
    window.location.reload();
  } catch (error) {
    console.error('Error completing task:', error);
  }
};

export default function TaskView({
  title,
  dateDue,
  priority,
  dateAssigned,
  updated,
  description,
  taskId,
  onClose,
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-xl">
        <h2 className="mb-4">{title}</h2>
        <div className="flex gap-4 mb-2">
          <p>
            <span className="text-slate-600">Due date:</span>{' '}
            <span className="text-black">
              {new Date(dateDue).toLocaleString('lt-LT', {
                dateStyle: 'short',
              })}
            </span>
          </p>
          <span className="flex flex-row gap-1">
            <p className="text-slate-600">Priority:</p>
            {getPriorityRender(priority)}
          </span>
        </div>
        <div className="flex gap-4 mb-4">
          <p>
            <span className="text-slate-600">Assigned:</span>{' '}
            <span className="text-black">
              {new Date(dateAssigned).toLocaleString('lt-LT', {
                dateStyle: 'short',
              })}
            </span>
          </p>
          {updated !== dateAssigned && (
            <p>
              <span className="text-slate-600">Updated:</span>{' '}
              <span className="text-black">
                {new Date(updated).toLocaleString('lt-LT', {
                  dateStyle: 'short',
                })}
              </span>
            </p>
          )}
        </div>
        <p>{description}</p>
        <span className="flex gap-4 mt-8">
          <button
            className="rounded-lg px-4 py-2 bg-slate-100 hover:bg-green-500 hover:text-white duration-150"
            onClick={() => handleComplete(taskId)}
          >
            Complete
          </button>
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 bg-slate-100 hover:bg-red hover:text-white duration-150"
          >
            Close
          </button>
        </span>
      </div>
    </div>
  );
}
