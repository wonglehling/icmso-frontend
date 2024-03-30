import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/userContext';

export const ProtectRoutes = () => {
    const { cookies } = useAuth();

    return cookies.icms_access_token ? <Outlet/> : <Navigate to='/login' exact />
};

export const UnprotectRoutes = () => {
    const { cookies } = useAuth();

    return !cookies.icms_access_token ? <Outlet/> : <Navigate to='/home' exact />
};