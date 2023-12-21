import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        username: '',
        email: '',
        password: '',
    });
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/register', userData);
            router.push('/login'); 
        } catch (error) {
            console.error('Error durante el registro:', error);
        }
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Registrarse</h1>
            <form onSubmit={handleSubmit}>
                <input name="nombre" type="text" value={userData.nombre} onChange={handleChange} required placeholder="Nombre" />
                <input name="apellido" type="text" value={userData.apellido} onChange={handleChange} required placeholder="Apellido" />
                <input name="username" type="text" value={userData.username} onChange={handleChange} required placeholder="Nombre de usuario" />
                <input name="email" type="email" value={userData.email} onChange={handleChange} required placeholder="Email" />
                <input name="password" type="password" value={userData.password} onChange={handleChange} required placeholder="Contraseña" />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
