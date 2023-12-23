import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../app/styles/register.module.scss'; 
import VoteButton from '@/app/components/ui/VoteButton';
import MainButton from '@/app/components/ui/MainButton';

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
        <div className={styles.registerContainer}>
            <div className={styles.formCard}>
                <h1>¡Regístrate!</h1>
                <form className={styles.registerForm} onSubmit={handleSubmit}>
                    <input
                        name="nombre"
                        type="text"
                        value={userData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Nombre"
                        className={styles.registerInput}
                    />
                    <input
                        name="apellido"
                        type="text"
                        value={userData.apellido}
                        onChange={handleChange}
                        required
                        placeholder="Apellido"
                        className={styles.registerInput}
                    />
                    <input
                        name="username"
                        type="text"
                        value={userData.username}
                        onChange={handleChange}
                        required
                        placeholder="Nombre de usuario"
                        className={styles.registerInput}
                    />
                    <input
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                        className={styles.registerInput}
                    />
                    <input
                        name="password"
                        type="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                        placeholder="Contraseña"
                        className={styles.registerInput}
                    />
                    <MainButton text="Registraece" onClick={handleSubmit} />
                </form>
            </div>
        </div>
    );
};

export default Register;
