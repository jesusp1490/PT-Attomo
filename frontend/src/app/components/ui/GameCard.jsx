import React from 'react';
import styles from '../../styles/gamecard.module.scss';
import VoteButton from './VoteButton';

const GameCard = ({ game, onVote, showVoteButton = true, user }) => {
    const userId = user?._id;
    const showButton = showVoteButton && user;

    return (
        <div className={styles.gameCard}>
            <h3 className={styles.gameName}>{game.nombre}</h3>
            <img src={game.imagen} alt={game.nombre} className={styles.gameImage} />
            <div className={styles.gameInfo}>
                <p className={styles.gameDeveloper}>Desarrollado por: {game.desarrollador}</p>
                <p className={styles.gameDescription}>{game.descripcion}</p>
                <p className={styles.gameCategory}>Categoría: {game.categoria}</p>
                <p className={styles.gameVotes}>Votos: {game.votos}</p>
                {showVoteButton && userId && (
                    <VoteButton gameId={game._id} onVote={onVote} userId={userId} />
                )}
            </div>
        </div>
    );
};

export default GameCard;
