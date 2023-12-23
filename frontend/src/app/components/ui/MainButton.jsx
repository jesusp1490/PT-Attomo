import React from 'react';
import PropTypes from 'prop-types';
import mainButtonStyles from '../../styles/mainbutton.module.scss'; 

const MainButton = ({ text, onClick }) => {

    return (
        <button className={mainButtonStyles.mainButton} onClick={onClick}>
            {text}
        </button>
    );
};

MainButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default MainButton;
