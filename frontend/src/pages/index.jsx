import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from '../app/components/ui/GameCard';
import styles from '../app/styles/index.module.scss';
import { useAuth } from '../app/hooks/AuthContext';

const HomePage = () => {
    const [games, setGames] = useState([]);
    const { user } = useAuth();

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
        console.log("handleVote invocado con gameId:", gameId);
        if (!user) {
            alert('Debes iniciar sesión para votar.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/games/vote', {
                userId: user._id, // Asegurarse de que user._id esté disponible
                gameId,
            });

            if (response.data.success) {
                // Actualizar el estado de los juegos con los nuevos votos
                const updatedGames = games.map((game) => {
                    if (game._id === gameId) {
                        // Aumentar en uno los votos del juego votado
                        return { ...game, votos: game.votos + 1 };
                    }
                    return game;
                });

                setGames(updatedGames);
                alert('Voto registrado con éxito');
            } else {
                // Manejar la respuesta en caso de que la votación no sea exitosa
                alert(response.data.message);
            }
        } catch (error) {
            // Manejar errores en la solicitud
            console.error('Error al votar:', error);
            alert('Error al votar. Por favor, intenta nuevamente.');
        }
    };

    return (
        <div>
            <div className={styles.gameGrid}>
                {games.map((game) => (
                    <GameCard
                        key={game._id}
                        game={game}
                        onVote={handleVote}
                        showVoteButton={!!user}
                        user={user}
                    />
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
