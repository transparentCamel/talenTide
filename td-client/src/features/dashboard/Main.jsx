import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRenderContext } from '../../customHooks/useRenderContext';
import Profile from './Profile';
export default function Main() {
  const [user, setUser] = useState(null);
  const { activeRender } = useRenderContext();
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);

      setUser(decodedToken);
    }
  }, []);

  const renderComponent = () => {
    switch (activeRender) {
      case 'workspace':
        return <p>{activeRender}</p>;
      case 'inbox':
        return <p>{activeRender}</p>;
      case 'analytics':
        return <p>{activeRender}</p>;
      case 'support':
        return <p>{activeRender}</p>;
      case 'profile':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <main className='bg-gray-50 w-full flex flex-col'>
      {user ? (
        <div>
          <p className='py-2 px-4 bg-white border-2 rounded-xl w-fit ml-4 mt-4'>
            Welcome to your dashboard, {user.name}! 👋
          </p>

          {renderComponent()}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
