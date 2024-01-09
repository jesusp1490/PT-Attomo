import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../app/hooks/AuthContext'; 
import styles from '../app/styles/login.module.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users/login', { email, password });

            if (response.data.success) {
                login(response.data.token, {
                    id: response.data.userInfo.id,
                    email: response.data.userInfo.email,
                    username: response.data.userInfo.username,
                    name: response.data.userInfo.name,
                    surname: response.data.userInfo.surname,
                    role: response.data.userInfo.role, 
                });
                router.push('/');
            } else {
                console.log('Inicio de sesión fallido:', response.data.message);
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
        }
    };

    return (
        <div className={styles.loginContainer}> {/* Agrega la clase del contenedor principal */}
            <div className={styles.formCard}> {/* Agrega la clase del formulario */}
                <h1>Iniciar Sesión</h1>
                <form className={styles.loginForm} onSubmit={handleLogin}> {/* Agrega la clase del formulario */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electrónico"
                        required
                        className={styles.loginInput}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        required
                        className={styles.loginInput} 
                    />
                    <button type="submit" className={styles.loginButton}> 
                    Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};


export default Login;
