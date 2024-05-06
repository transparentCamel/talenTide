import React from 'react';

export default function UserTaskCard({ title, updatedAt }) {
  return (
    <div>
      <header>
        <h3>{title}</h3>
        {updatedAt && <p>{updatedAt}</p>}
      </header>
    </div>
  );
}
