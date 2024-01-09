import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUserData();
        }
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users/profile');
            if (response.data) {
                setUser(response.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
            setUser(null);
        }
    };

    const login = (token, userInfo) => {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser({
            ...userInfo,
            votedGames: userInfo.votedGames || [], // Inicializa votedGames si es undefined
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
