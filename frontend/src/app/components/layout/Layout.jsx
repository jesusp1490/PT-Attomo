import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import React from 'react';


const Layout = ({ children }) => {

    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />

        </>
    );
};

export default Layout;
