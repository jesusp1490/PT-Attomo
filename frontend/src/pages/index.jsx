import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import GameCard from '../app/components/ui/GameCard';
import styles from '../app/styles/index.module.scss';
import { useAuth } from '../app/hooks/AuthContext';

const HomePage = () => {
    const [games, setGames] = useState([]);
    const { user } = useAuth();
    
    useEffect(() => {
        console.log("Estado del usuario en HomePage:", user);
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:5000/games');
                setGames(response.data);
            } catch (error) {
                console.error('Error al obtener los juegos:', error);
            }
        };

        fetchGames();
    }, [user]);

    console.log("Estado del usuario en HomePage:", user);
    const userId = user ? user._id : null;

    const handleVote = async (gameId) => {
    try {
        const response = await axios.post('http://localhost:5000/games/vote', {
            userId,
            gameId,
        });

        if (response.data.success) {
            const updatedGames = games.map((game) => {
                if (game._id === gameId) {
                    return { ...game, votos: game.votos + 1 };
                }
                return game;
            });

            setGames(updatedGames);

            alert('Voto registrado con éxito');
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error('Error al votar:', error);
        alert('Error al votar');
    }
};
    
    return (
        <div>
            <div className={styles.gameGrid}>
                {games.map((game) => (
                    <GameCard key={game._id} game={game} onVote={handleVote} />
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
