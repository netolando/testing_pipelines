import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    userName: string | null;
    setUserName: (name: string) => void;
};

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    setAccessToken: () => { },
    userName: null,
    setUserName: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accessToken, setAccessTokenState] = useState<string | null>(() => {
        return localStorage.getItem('accessToken');
    });
    const [userName, setUserNameState] = useState<string | null>(() => {
        return localStorage.getItem('userName');
    });

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
        } else {
            localStorage.removeItem('accessToken');
        }
    }, [accessToken]);

    useEffect(() => {
        if (userName) {
            localStorage.setItem('userName', userName);
        } else {
            localStorage.removeItem('userName');
        }
    }, [userName]);

    const setAccessToken = (token: string) => {
        setAccessTokenState(token);
    };

    const setUserName = (name: string) => {
        setUserNameState(name);
    };

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, userName, setUserName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
