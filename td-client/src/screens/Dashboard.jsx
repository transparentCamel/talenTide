import React, { useState, useEffect } from 'react';
import Nav from '../features/dashboard/Nav';
import Main from '../features/dashboard/Main';
import { RenderProvider } from '../customHooks/useRenderContext';
import { TokenProvider } from '../customHooks/useTokenFetch';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoading(false);
    }
  }, []);

  return (
    <RenderProvider>
      <TokenProvider>
        <div className='flex flex-row max-lg:flex-col'>
          {!isLoading && (
            <>
              <Nav />
              <Main />
            </>
          )}
        </div>
      </TokenProvider>
    </RenderProvider>
  );
}
