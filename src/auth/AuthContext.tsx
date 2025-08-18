import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
};

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    setAccessToken: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accessToken, setAccessTokenState] = useState<string | null>(() => {
        return localStorage.getItem('accessToken');
    });

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
        } else {
            localStorage.removeItem('accessToken');
        }
    }, [accessToken]);

    const setAccessToken = (token: string) => {
        setAccessTokenState(token);
    };

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
