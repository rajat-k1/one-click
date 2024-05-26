// contexts/SocialContext.js
'use client';
import React, { createContext, useState } from 'react';

const SocialContext = createContext({
  connections: {
    facebook: false,
    instagram: false,
    twitter: false,
    linkedin: false,
  },
  setConnections: () => {},
});

export const SocialProvider = ({ children }) => {
  const [connections, setConnections] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
    linkedin: false,
  });
  


  return (
    <SocialContext.Provider value={{ connections, setConnections }}>
      {children}
    </SocialContext.Provider>
  );
};

export default SocialContext;
