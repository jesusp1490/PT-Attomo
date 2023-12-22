import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles//gameform.module.scss'; 

const GameForm = ({ onGameAdded }) => {
    const [gameData, setGameData] = useState({
        nombre: '',
        imagen: '',
        desarrollador: '',
        category: '',
        description: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/games', gameData);
            onGameAdded(response.data);
            setGameData({
                nombre: '',
                imagen: '',
                desarrollador: '',
                category: '',
                description: '',
            });
        } catch (error) {
            console.error('Error al añadir el juego:', error);
        }
    };

    const handleChange = (e) => {
        setGameData({ ...gameData, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.gameFormContainer}>
            <h1>Añadir Juego</h1>
            <form onSubmit={handleSubmit} className={styles.gameForm}>
                <input
                    type="text"
                    name="nombre"
                    value={gameData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre del juego"
                    required
                    className={styles.gameInput}
                />
                <input
                    type="text"
                    name="imagen"
                    value={gameData.imagen}
                    onChange={handleChange}
                    placeholder="URL de la imagen"
                    required
                    className={styles.gameInput}
                />
                <input
                    type="text"
                    name="desarrollador"
                    value={gameData.desarrollador}
                    onChange={handleChange}
                    placeholder="Desarrollador del juego"
                    required
                    className={styles.gameInput}
                />
                <input
                    type="text"
                    name="category"
                    value={gameData.category}
                    onChange={handleChange}
                    placeholder="Categoría del juego"
                    required
                    className={styles.gameInput}
                />
                <textarea
                    name="description"
                    value={gameData.description}
                    onChange={handleChange}
                    placeholder="Descripción del juego"
                    required
                    className={styles.gameTextarea}
                />
                <button type="submit" className={styles.gameButton}>
                    Añadir Juego
                </button>
            </form>
        </div>
    );
};

export default GameForm;
