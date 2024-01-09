import React from 'react';
import Layout from '../app/components/layout/Layout';
import '../app/styles/globals.scss';
import { AuthProvider } from '../app/hooks/AuthContext'; 
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider> 
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    );
}

export default MyApp;
