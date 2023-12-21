import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import React, { useEffect } from 'react';

const Layout = ({ children }) => {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log("Usuario ha iniciado sesión");
        } else {
            console.log("Usuario no ha iniciado sesión");
        }
    }, []);

    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
