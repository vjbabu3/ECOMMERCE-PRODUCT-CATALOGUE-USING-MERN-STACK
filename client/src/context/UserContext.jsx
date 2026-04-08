import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(() => {
        const localData = localStorage.getItem('userInfo');
        return localData ? JSON.parse(localData) : null;
    });

    const login = (userData) => {
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setUserInfo(userData);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
    };

    return (
        <UserContext.Provider value={{ userInfo, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
