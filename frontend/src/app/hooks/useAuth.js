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
            // Decodificar el token si es necesario
            console.log("Token encontrado en AuthProvider");

            // Establecer el token directamente en el header de las solicitudes axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Obtener los datos del usuario aquí
            axios.get('http://localhost:5000/users/profile')
                .then((response) => {
                    const userData = response.data;
                    console.log("Usuario en AuthProvider:", userData);
                    setUser(userData);
                })
                .catch((error) => {
                    console.error('Error al obtener los datos del usuario:', error);
                });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/users/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);

                console.log("Usuario en HomePage:", user);
            }
        } catch (error) {
            console.error('Error durante el login:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
  
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
