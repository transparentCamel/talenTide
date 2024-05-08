import React from 'react';
import { useRenderContext } from '../../customHooks/useRenderContext';

export default function InboxCard({ title, date }) {
  const { handleRenderChange } = useRenderContext();
  return (
    <div className="border-2 rounded-lg shadow-md p-4">
      <h3 className="mb-2">{title}</h3>
      <div className="flex">
        <p>
          {new Date(date).toLocaleString('lt-LT', {
            dateStyle: 'short',
          })}
        </p>
        <a
          onClick={() => handleRenderChange('workspace')}
          className="cursor-pointer ml-auto hover:text-blue duration-150"
        >
          View tasks
        </a>
      </div>
    </div>
  );
}
