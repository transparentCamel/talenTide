import React from 'react';
import Nav from '../features/dashboard/Nav';
import Main from '../features/dashboard/Main';
import { RenderProvider } from '../customHooks/useRenderContext';
export default function Dashboard() {
  return (
    <RenderProvider>
      <div className='flex flex-row'>
        <Nav />
        <Main />
      </div>
    </RenderProvider>
  );
}
