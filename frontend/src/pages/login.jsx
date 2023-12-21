import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users/login', { email, password });
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                console.log("Usuario ha iniciado sesión");

                // Redirige al usuario a la página de inicio
                router.push('/');
            } else {
                console.error("Inicio de sesión fallido:", response.data.message);
            }
        } catch (error) {
            console.error('Error durante la solicitud de inicio de sesión:', error);
            alert('Error durante la solicitud de inicio de sesión');
        }
    };


    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Correo electrónico"
                />
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Contraseña"
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
