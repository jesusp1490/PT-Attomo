import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../app/styles/register.module.scss'; 
import VoteButton from '@/app/components/ui/VoteButton';
import MainButton from '@/app/components/ui/MainButton';

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
    });
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users/register', userData);

            if (response.data.success) {
                console.log('Registration successful', response.data.message);
                alert('REGISTRATION SUCCESSFUL!! You can now log in.');
                router.push('/login');
            } else {
                console.error('Registration failed', response.data.message);
                alert('REGISTRATION FAILED! Make sure all fields are correctly filled and try again. REMEMBER THAT YOUR PASSWORD MUST CONTAIN AN UPPERCASE CHARACTER, A LOWERCASE CHARACTER, ONE OF THESE CHARACTERS: $@$!%*?&, AND MUST BE BETWEEN 8 AND 15 CHARACTERS LONG.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration.');
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
                    <MainButton text="Registrarse" onClick={handleSubmit} />
                </form>
            </div>
        </div>
    );
};

export default Register;
