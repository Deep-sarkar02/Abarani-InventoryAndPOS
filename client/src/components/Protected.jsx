import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Protected = ({ adminOnly = false }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;

    if (!user) return <Navigate to="/login" replace />;

    if (adminOnly && user.role !== 'admin') {
        return <div style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>Access Denied: Admin Rights Required</div>;
    }

    return <Outlet />;
};

export default Protected;
