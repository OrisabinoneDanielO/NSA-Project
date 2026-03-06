import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectRole } from '../store/slices/authSlice';

/**
 * ProtectedRoute
 * @param {string|string[]} allowedRoles - Role(s) allowed to access the route
 * If no allowedRoles provided, any authenticated user can access.
 */
const ProtectedRoute = ({ allowedRoles }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const role = useSelector(selectRole);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
