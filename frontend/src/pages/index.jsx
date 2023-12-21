import axios from 'axios';
import GameCard from '../app/components/ui/GameCard';
import styles from '../app/styles/index.module.scss'
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../app/hooks/userContext';

const HomePage = () => {

    const [games, setGames] = useState([]);

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

    const { user } = useContext(UserContext);
    const userId = user ? user._id : null;
    const handleVote = async (gameId) => {
        
        try {
            const response = await axios.post('http://localhost:5000/games/vote', { userId, gameId });
            if (response.data.success) {
                alert("Voto registrado con éxito");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error al votar:", error);
            alert("Error al votar");
        }
    };

    return (
        <div className={styles.gameGrid}>
            {games.map(game => (
                <GameCard key={game._id} game={game} onVote={handleVote} />
            ))}
        </div>
    );
};

export default HomePage;
