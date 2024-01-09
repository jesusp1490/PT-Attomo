import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/adminpanel.module.scss';
import GameForm from './GameForm'; // Asegúrate de importar GameForm desde la ubicación correcta

const AdminPanel = ({ user }) => {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);

    useEffect(() => {
        if (user.role === 'admin') {
            fetchGames();
        }
    }, [user]);

    const fetchGames = async () => {
        // ... (Tu código para obtener la lista de juegos)
    };

    const handleEditGame = (game) => {
        // ... (Tu código para editar un juego)
    };

    const handleDeleteGame = (gameId) => {
        // ... (Tu código para eliminar un juego)
    };

    if (user.role !== 'admin') {
        return null; 
    }

    return (
        <div className={styles.adminPanelContainer}>
            <div className={styles.leftPanel}>
                <GameForm game={selectedGame} fetchGames={fetchGames} />
            </div>
            <div className={styles.rightPanel}>
                <h1>Lista de Juegos</h1>
                <div className={styles.gameList}>
                    {games.map((game) => (
                        <div key={game._id} className={styles.gameCard}>
                            <h2>{game.nombre}</h2>
                            <button onClick={() => handleEditGame(game)} className={styles.editButton}>
                                Editar
                            </button>
                            <button onClick={() => handleDeleteGame(game._id)} className={styles.deleteButton}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
