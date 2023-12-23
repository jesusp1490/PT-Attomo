import React from 'react';
import PropTypes from 'prop-types';
import voteButtonStyles from '../../styles/votebutton.module.scss'; 

const VoteButton = ({ onVote, gameId }) => {
    const handleVoteClick = async () => {
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
        <button onClick={handleVoteClick} className={voteButtonStyles.voteButton}>
            Votar
        </button>
    );
};

VoteButton.propTypes = {
    onVote: PropTypes.func.isRequired,
    gameId: PropTypes.string.isRequired,
};

export default VoteButton;
