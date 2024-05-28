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
  mediaUrl: '',
  setmediaUrl: (mediaUrl) => set({mediaUrl})
});

export const SocialProvider = ({ children }) => {
  const [connections, setConnections] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
    linkedin: false,
  });
  
  const [mediaUrl, setmediaUrl] = useState('');

  return (
    <SocialContext.Provider value={{ connections, setConnections, mediaUrl, setmediaUrl }}>
      {children}
    </SocialContext.Provider>
  );
};

export default SocialContext;
