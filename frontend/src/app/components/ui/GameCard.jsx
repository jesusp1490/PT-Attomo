import React from 'react';
import styles from '../../styles/gamecard.module.scss'; 

const GameCard = ({ game, onVote }) => {
    return (
        <div className={styles.gameCard}>
            <h3 className="gameName">{game.nombre}</h3>
            <img src={game.imagen} alt={game.nombre} className="gameImage" />
            <div className="gameInfo">
                <p className="gameDeveloper">Desarrollador: {game.desarrollador}</p>
                <p className="gameDescription">{game.descripcion}</p>
                <p className="gameCategory">Categoría: {game.categoria}</p>
                <p className="gameVotes">Votos: {game.votos}</p>
                <button onClick={() => onVote(game._id)}>Votar</button>
            </div>
        </div>
    );
};

export default GameCard;
