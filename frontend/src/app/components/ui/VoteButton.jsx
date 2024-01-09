import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import voteButtonStyles from '../../styles/votebutton.module.scss';

const VoteButton = ({ onVote, gameId, userId }) => {
    const handleVoteClick = async () => {
        console.log("Botón votar presionado. gameId:", gameId, "userId:", userId);
        console.log("Valor de gameId:", gameId);
        console.log("Valor de userId:", userId);
        try {
            const response = await axios.post('http://localhost:5000/games/vote', {
                userId,
                gameId,
            });

            if (response.data.success) {
                onVote(gameId);
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
        <button
            onClick={handleVoteClick}
            className={voteButtonStyles.voteButton}
            disabled={!userId} 
        >
            Votar
        </button>
    );
};

VoteButton.propTypes = {
    onVote: PropTypes.func.isRequired,
    gameId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired, 
};

export default VoteButton;
