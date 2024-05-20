import React from 'react';

export default function UserTaskCard({
  title,
  category,
  updatedAt,
  createdAt,
  dateDue,
  status,
  priority,
  viewTask,
}) {
  const getStatusRender = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className='flex flex-row items-center gap-2'>
            <div className='rounded-full w-2 h-2 bg-green-500'></div>
            <p className='text-green-500'>Completed</p>
          </span>
        );
      case 'in_progress':
        return (
          <span className='flex flex-row items-center gap-2'>
            <div className='rounded-full w-2 h-2 bg-yellow-500'></div>
            <p className='text-yellow-500'>In Progress</p>
          </span>
        );
      case 'pending':
        return (
          <span className='flex flex-row items-center gap-2'>
            <div className='rounded-full w-2 h-2 bg-slate-600'></div>
            <p className='text-slate-600'>Pending</p>
          </span>
        );
      case 'late':
        return (
          <span className='flex flex-row items-center gap-2'>
            <div className='rounded-full w-2 h-2 bg-red'></div>
            <p className='text-red'>Late</p>
          </span>
        );
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
  return (
    <div className='bg-white rounded-lg p-4 border-2 shadow-md'>
      <header className='flex flex-row items-center gap-4 flex-wrap'>
        <h3 className=''>{title}</h3>
        <span className='flex flex-row items-center  gap-4'>
          <h4 className='bg-slate-100 rounded-full py-2 px-4'>{category}</h4>
        </span>
        <span className='flex flex-row items-center gap-2 ml-auto max-sm:ml-0'>
          {getStatusRender(status)}
        </span>
      </header>
      <div className='flex flex-row items-end mt-4 max-sm:flex-col max-sm:items-start'>
        <div className='flex flex-col gap-2'>
          <p className='text-slate-600'>{`Date due: ${dateDue}`}</p>
          <span className='flex flex-row gap-1'>
            <p className='text-slate-600'>Priority:</p>
            {getPriorityRender(priority)}
          </span>
          {updatedAt === createdAt ? (
            <p className='text-slate-500'>{`Created: ${createdAt}`}</p>
          ) : (
            <p className='text-slate-500'>{`Updated: ${updatedAt}`}</p>
          )}
        </div>
        <p
          className='ml-auto max-sm:ml-0 cursor-pointer select-none  hover:text-blue duration-150'
          onClick={viewTask}
        >
          View task
        </p>
      </div>
    </div>
  );
}
