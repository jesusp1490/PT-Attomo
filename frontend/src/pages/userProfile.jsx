import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../app/hooks/AuthContext';
import GameCard from '../app/components/ui/GameCard';
import styles from '../app/styles/userProfile.module.scss';

const UserProfile = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log("Datos del usuario:", user);
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const handleAdminButtonClick = () => {
        router.push('/admin');
    };

    if (!user) {
        return <p>Cargando perfil...</p>;
    }

    return (
        <div className={styles.userProfileContainer}>
            <div className={styles.userInfo}>
                <h1>Perfil del Usuario</h1>
                <p>Nombre: {user.name}</p>
                <p>Apellido: {user.surname}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                {user.role === 'admin' && (
                    <button onClick={handleAdminButtonClick} className={styles.adminButton}>
                        Dashboard
                    </button>
                )}
                <button onClick={handleLogout} className={styles.logoutButton}>
                    Cerrar sesión
                </button>
            </div>
            <div className={styles.favoriteGames}>
                <h2>Juegos Favoritos</h2>
                {
                    user && user.votedGames && user.votedGames.map((game) => (
                        <GameCard
                            key={game._id}
                            game={game}
                            onVote={() => { }}
                            showVoteButton={false}
                            user={user}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default UserProfile;
