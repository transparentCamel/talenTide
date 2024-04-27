import React, { createContext, useContext, useState } from 'react';

const RenderContext = createContext();

export const useRenderContext = () => useContext(RenderContext);

export const RenderProvider = ({ children }) => {
  const [activeRender, setActiveRender] = useState('workspace');

  const handleRenderChange = (newRender) => {
    setActiveRender(newRender);
  };

  return (
    <RenderContext.Provider value={{ activeRender, handleRenderChange }}>
      {children}
    </RenderContext.Provider>
  );
};
