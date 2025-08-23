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
        const token = localStorage.getItem('accessToken');
        console.log('[AuthContext] Initial accessToken from localStorage:', token);
        return token;
    });
    const [userName, setUserNameState] = useState<string | null>(() => {
        const name = localStorage.getItem('userName');
        console.log('[AuthContext] Initial userName from localStorage:', name);
        return name;
    });

    React.useEffect(() => {
        console.log('[AuthContext] accessToken changed:', accessToken);
    }, [accessToken]);
    React.useEffect(() => {
        console.log('[AuthContext] userName changed:', userName);
    }, [userName]);

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            console.log('[AuthContext] accessToken updated in localStorage:', accessToken);
        } else {
            localStorage.removeItem('accessToken');
            console.log('[AuthContext] accessToken removed from localStorage');
        }
    }, [accessToken]);

    useEffect(() => {
        if (userName) {
            localStorage.setItem('userName', userName);
            console.log('[AuthContext] userName updated in localStorage:', userName);
        } else {
            localStorage.removeItem('userName');
            console.log('[AuthContext] userName removed from localStorage');
        }
    }, [userName]);

    const setAccessToken = (token: string) => {
        console.log('[AuthContext] setAccessToken called:', token);
        setAccessTokenState(token);
        console.log('[AuthContext] setAccessToken finished, new value:', token);
    };

    const setUserName = (name: string) => {
        console.log('[AuthContext] setUserName called:', name);
        setUserNameState(name);
        console.log('[AuthContext] setUserName finished, new value:', name);
    };

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, userName, setUserName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
