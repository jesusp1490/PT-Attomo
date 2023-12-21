import React from 'react';
import styles from '../../styles/footer.module.scss'; 

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} TopGames2023. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;
