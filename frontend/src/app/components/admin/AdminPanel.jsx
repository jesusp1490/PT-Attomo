import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../hooks/useAuth';
import GameForm from '../forms/GameForm';


const AdminPanel = () => {
    const { user } = useContext(AuthContext);
    const [games, setGames] = useState([]);

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchGames();
        }
    }, [user]);

    const fetchGames = async () => {
        try {
            const response = await axios.get('http://localhost:5000/games');
            setGames(response.data);
        } catch (error) {
            console.error('Error al obtener los juegos:', error);
        }
    };

    const onGameAdded = (newGame) => {
        setGames([...games, newGame]);
    };

    const handleEditGame = async (gameId, gameData) => {
        try {
            await axios.put(`http://localhost:5000/games/${gameId}`, gameData);
            fetchGames(); 
        } catch (error) {
            console.error('Error al editar el juego:', error);
        }
    };

    const handleDeleteGame = async (gameId) => {
        try {
            await axios.delete(`http://localhost:5000/games/${gameId}`);
            setGames(games.filter(game => game._id !== gameId));
        } catch (error) {
            console.error('Error al eliminar el juego:', error);
        }
    };

    if (!user || user.role !== 'admin') {
        return <p>Acceso restringido: Solo administradores.</p>;
    }

    return (
        <div>
            <h1>Panel de Administración</h1>
            <GameForm onGameAdded={onGameAdded} />
            {games.map(game => (
                <div key={game._id}>
                    <h2>{game.nombre}</h2>
                    {/* Más detalles del juego */}
                    <button onClick={() => handleEditGame(game._id, game)}>Editar</button>
                    <button onClick={() => handleDeleteGame(game._id)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
};

export default AdminPanel;
