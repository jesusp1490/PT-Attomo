import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../app/styles/register.module.scss';
import MainButton from '../app/components/ui/MainButton';
import mainButtonStyles from '../app/styles/mainbutton.module.scss';

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
                alert('REGISTRATION FAILED! ' + response.data.message);
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
                        name="name"
                        type="text"
                        value={userData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Nombre"
                        className={styles.registerInput}
                    />
                    <input
                        name="surname"
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
                    <button type="submit" className={mainButtonStyles.mainButton}>
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
