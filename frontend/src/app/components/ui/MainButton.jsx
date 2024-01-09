import React from 'react';
import PropTypes from 'prop-types';
import mainButtonStyles from '../../styles/mainbutton.module.scss'; 

const MainButton = ({ text, type }) => {
    return (
        <button className={mainButtonStyles.mainButton} type={type}>
            {text}
        </button>
    );
};

MainButton.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,  
};

export default MainButton;