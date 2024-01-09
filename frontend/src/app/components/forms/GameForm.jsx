import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/gameform.module.scss';

const GameForm = ({ game, fetchGames }) => {
    const [gameData, setGameData] = useState({
        nombre: '',
        imagen: '',
        desarrollador: '',
        categoria: '',
        descripcion: '',
    });

    useEffect(() => {
        if (game) {
            setGameData({ ...game });
        }
    }, [game]);

    const handleChange = (e) => {
        setGameData({ ...gameData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (game) {
                await axios.put(`http://localhost:5000/games/${game._id}`, gameData);
            } else {
                await axios.post('http://localhost:5000/games', gameData);
            }
            fetchGames();
            setGameData({
                nombre: '',
                imagen: '',
                desarrollador: '',
                categoria: '',
                descripcion: '',
            });
        } catch (error) {
            console.error('Error al gestionar el juego:', error);
        }
    };

    return (
        <div className={styles.gameFormContainer}> 
            <div className={styles.formCard}> 
                <h1>¡Administra Juegos!</h1> 
                <form className={styles.gameForm} onSubmit={handleSubmit}> 
                    <input
                        name="nombre"
                        type="text"
                        value={gameData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Nombre del juego"
                        className={styles.gameInput} 
                    />
                    <input
                        name="imagen"
                        type="text"
                        value={gameData.imagen}
                        onChange={handleChange}
                        required
                        placeholder="URL de la imagen"
                        className={styles.gameInput} 
                    />
                    <input
                        name="desarrollador"
                        type="text"
                        value={gameData.desarrollador}
                        onChange={handleChange}
                        required
                        placeholder="Desarrollador del juego"
                        className={styles.gameInput} 
                    />
                    <input
                        name="categoria"
                        type="text"
                        value={gameData.categoria}
                        onChange={handleChange}
                        required
                        placeholder="Categoría del juego"
                        className={styles.gameInput} 
                    />
                    <textarea
                        name="descripcion"
                        value={gameData.descripcion}
                        onChange={handleChange}
                        required
                        placeholder="Descripción del juego"
                        className={styles.gameInput}
                    />
                    <button type="submit" className={styles.gameButton}> 
                        {game ? 'Actualizar Juego' : 'Agregar Juego'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GameForm;
