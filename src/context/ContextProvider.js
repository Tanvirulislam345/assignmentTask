import React, { createContext, useContext, useEffect, useState } from 'react';

export const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
};

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        if (data) {
            setUser(data);
        }
        setLoading(false);
    }, []);

    return (
        <authContext.Provider value={{ user, setUser, loading }}>
            {children}
        </authContext.Provider>
    );
};

export default ContextProvider;
