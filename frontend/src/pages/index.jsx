import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from '../app/components/ui/GameCard';
import styles from '../app/styles/index.module.scss';
import { useAuth } from '../app/hooks/useAuth';

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

    // Verificamos si el token está en localStorage y luego obtenemos los datos del usuario
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Hacer una solicitud al servidor para obtener los datos del usuario
            const fetchUserData = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/users/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const userData = response.data;
                    console.log("Usuario en HomePage:", userData);
                    setUser(userData); 
                } catch (error) {
                    console.error('Error al obtener los datos del usuario:', error);
                }
            };

            fetchUserData();
        }
    }, [user]);

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
                        // Incrementa el contador de votos en 1
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
                </div>
            ) : (
                <p>Bienvenido</p>
            )}
        </div>
    );
};

export default HomePage;
