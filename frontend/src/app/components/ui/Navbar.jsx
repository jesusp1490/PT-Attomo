import React from 'react';
import Link from 'next/link';
import styles from '../../styles/navbar.module.scss';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">
                    TopGames2023
                </Link>
            </div>
            <div className={styles.links}>
                <Link href="/">Home</Link>
                <Link href="/profile">Perfil</Link>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;
