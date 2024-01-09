import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from '../app/components/ui/GameCard';
import styles from '../app/styles/index.module.scss';
import { useAuth } from '../app/hooks/AuthContext';

const HomePage = () => {
    const [games, setGames] = useState([]);
    const { user, login } = useAuth(); // Asegurarse de que se esté utilizando el usuario y la función de inicio de sesión correctamente

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:5000/games');
                setGames(response.data);
            } catch (error) {
                console.error('Error al obtener los juegos:', error);
            }
        };

        fetchGames();
    }, []);

    const handleVote = async (gameId) => {
        console.log("Usuario actual:", user);

        // Asegurarse de que el usuario esté autenticado
        if (!user || !user.id) {
            alert('Debes estar registrado y haber iniciado sesión para votar.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/games/vote', {
                userId: user.id, // Utilizar user.id en lugar de user._id
                gameId,
            });

            if (response.data.success) {
                // Actualizar el estado de los juegos
                setGames(games.map(game => game._id === gameId ? { ...game, votos: game.votos + 1 } : game));

                // Actualizar el estado del usuario (si es necesario)
                login(user.token, user); // Utilizar la función de inicio de sesión para actualizar el estado del usuario

                alert('Voto registrado con éxito');
            }
        } catch (error) {
            console.error('Error al votar:', error);
            alert('Error al votar');
        }
    };

    return (
        <div>
            <div className={styles.gameGrid}>
                {games.map(game => (
                    <GameCard key={game._id} game={game} onVote={handleVote} showVoteButton={!!user} user={user} />
                ))}
            </div>
            {user ? (
                <div>
                    <p>Bienvenido, {user.username}</p>
                    {/* Aquí puedes añadir más detalles del usuario si es necesario */}
                </div>
            ) : (
                <p>Cargando información del usuario...</p>
            )}
        </div>
    );
};

export default HomePage;
