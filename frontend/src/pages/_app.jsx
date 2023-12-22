import React from 'react';
import Layout from '../app/components/layout/Layout';
import '../app/styles/globals.scss';
import { AuthProvider } from '../app/hooks/useAuth'; 
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider> 
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&display=swap" rel="stylesheet" />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    );
}

export default MyApp;
