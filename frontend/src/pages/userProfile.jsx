import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../app/hooks/AuthContext'; // Asegúrate de que el hook se importa correctamente
import styles from '../app/styles/userprofile.module.scss';

const UserProfile = () => {
    const { user, logout } = useAuth(); // Utiliza el hook useAuth
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    if (!user) {
        return <p>Cargando perfil...</p>;
    }

    return (
        <div className={styles.userProfileContainer}>
            <h1>Perfil del Usuario</h1>
            <>
                <p>Nombre: {user.name}</p>
                <p>Apellido: {user.surname}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <button onClick={handleLogout} className={styles.logoutButton}>Cerrar sesión</button>
            </>
        </div>
    );
};

export default UserProfile;
