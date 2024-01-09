import axios from 'axios';
import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token en AuthProvider:", token);

        if (token) {
            console.log("Token encontrado en AuthProvider");
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUserData();
        }
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users/profile');
            console.log("Datos del usuario obtenidos:", response.data); 
            setUser(response.data);
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    };


    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/users/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                fetchUserData(); 
            }
        } catch (error) {
            console.error('Error durante el login:', error.response ? error.response.data : error);
        }
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
