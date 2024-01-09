import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminPanel from '../app/components/admin/AdminPanel';
import { useAuth } from '../app/hooks/AuthContext'; 

const AdminPage = () => {
    const { user } = useAuth(); 
    const router = useRouter();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            router.push('/login');
        }
    }, [user, router]);

    return user && user.role === 'admin' ? (
        <div>
            <h1>Panel de Administración</h1>
            <AdminPanel />
        </div>
    ) : (
        <p>Cargando o acceso restringido...</p>
    );
};

export default AdminPage;
