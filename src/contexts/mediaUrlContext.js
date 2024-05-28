// context/SharedContext.js
import { createContext, useState, useContext } from 'react';

const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
    const [mediaUrl, setMediaUrl] = useState('');
    // You can add other shared states here

    return (
        <SharedContext.Provider value={{ mediaUrl, setMediaUrl }}>
            {children}
        </SharedContext.Provider>
    );
};

export const useSharedState = () => useContext(SharedContext);
