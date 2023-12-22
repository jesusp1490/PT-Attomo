import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../app/hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import styles from '../app/styles/userprofile.module.scss'; 

const UserProfile = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log("Usuario en UserProfile:", user);
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            fetchUserData(decoded.userId);
        }
    }, [user]);

    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/users/profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        } catch (error) {
            console.error('Error fetching user data', error);
        }
    };

    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
        router.push('/login');
    };

    if (!user) {
        router.push('/login');
        return null;
    }

    return (
        <div className={styles.userProfileContainer}>
            <h1>Perfil del Usuario</h1>
            {user ? (
                <>
                    <p>Nombre: {user.name}</p>
                    <p>Apellido: {user.surname}</p>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout} className={styles.logoutButton}>Cerrar sesión</button>
                </>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
    );
};

export default UserProfile;
