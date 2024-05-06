import React from 'react';
import { useRenderContext } from '../../customHooks/useRenderContext';
import Profile from './Profile';
import { useTokenFetch } from '../../customHooks/useTokenFetch';
import EmpDb from './EmpDb';
import AdminWorkspace from './AdminWorkspace';
import UserWorkspace from './UserWorkspace';
export default function Main() {
  const { activeRender } = useRenderContext();
  const { user } = useTokenFetch();
  const renderComponent = () => {
    switch (activeRender) {
      case 'workspace':
        if (user.role === 'admin') {
          return <AdminWorkspace />;
        } else {
          return <UserWorkspace />;
        }

      case 'inbox':
        return <p>{activeRender}</p>;
      case 'analytics':
        return <p>{activeRender}</p>;
      case 'support':
        return <p>{activeRender}</p>;
      case 'profile':
        return <Profile />;
      case 'db':
        return <EmpDb />;
      default:
        return null;
    }
  };

  return (
    <main className="bg-gray-50 w-full flex flex-col">
      <div>
        <p className="py-2 px-4 bg-white border-2 rounded-xl w-fit ml-4 mt-4">
          Welcome to your dashboard, {user.name}! 👋
        </p>

        {renderComponent()}
      </div>
    </main>
  );
}
