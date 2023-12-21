import React, { useState, useEffect } from 'react';
import Layout from '../app/components/layout/Layout';
import { UserContext } from '../app/hooks/userContext';
import '../app/styles/globals.scss';
import jwt_decode from 'jwt-decode'; // Importa jwt-decode si vas a usarlo para decodificar el token

function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Decodifica el token para obtener información del usuario
                const decoded = jwt_decode(token);
                setUser(decoded); // Aquí asumimos que decoded contiene la información necesaria
                console.log("Usuario ha iniciado sesión", decoded);
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        } else {
            console.log("Usuario no ha iniciado sesión");
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserContext.Provider>
    );
}

export default MyApp;
