import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './ContextProvider';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <p>loading..</p>;
    }

    if (user?.accessToken) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} />;
};

export default PrivateRoute;
