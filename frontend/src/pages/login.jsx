import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../app/hooks/useAuth';
import styles from '../app/styles/login.module.scss'; 
import MainButton from '../app/components/ui/MainButton';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { login } = useAuth(); 

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users/login', { email, password });
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                console.log("Usuario ha iniciado sesión");
                await login(email, password);
                router.push('/');
            } else {
                console.error("Inicio de sesión fallido:", response.data.message);
            }
        } catch (error) {
            console.error(error.response.data);
            alert('Error durante la solicitud de inicio de sesión');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.formCard}>
                <h1>Iniciar Sesión</h1>
                <form className={styles.loginForm} onSubmit={handleLogin}>
                    <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Correo electrónico"
                        className={styles.loginInput}
                    />
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Contraseña"
                        className={styles.loginInput}
                    />
                    <MainButton text="Iniciar Sesión" onClick={handleLogin} />
                </form>
            </div>
        </div>
    );
};

export default Login;
